var {db,sessionDB}=require("./db")
var bodyParser = require('body-parser')
var session = require('express-session')
const LowdbStore = require('lowdb-session-store')(session);
var jwt = require('jsonwebtoken');

var {Login}=require("./Funcs/Login");




function getSession(id){
    var value=sessionDB.filter({_id:id}).value()
    
}

function rout(app){
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    
    app.set('trust proxy', 1) // trust first proxy
        app.use(session({
            secret: 'keyboard cat',
            saveUninitialized: true,
            httpOnly:true,
            resave:true,
            store: new LowdbStore(sessionDB, {
                ttl: 86400
              })
    }))


    app.get(['/','/store','/login','/register','/_getOrder'], function(req, res) {
       var sessionID=null,
       data=null,
       cart=null
        if(req.session.UserData){
            var full_data=
            db.get("users").filter({
                email:req.session.UserData.email
            }).value()[0]
            //res.render('index',{sessionID:req.sessionID,data:{email:full_data.email,name:full_data.name}});
            sessionID=req.sessionID
            data={email:full_data.email,name:full_data.name}
        }
        if(req.session.cart){
            sessionID=req.sessionID
            cart=req.session.cart
        }
        
        res.render('index',{sessionID:sessionID,data:data,cart:cart});
    });

    app.get("/api.products/", function(req, res) {
        var products=db.get('products').value()
        var types=[]
        var Re=[]
        products.forEach((e,i) => {
            //e["id"]=i
            var {title,price,rating,type,id,filename}=e
            Re.push({title,price,rating,type,id,filename})
            if(types.indexOf(e.type) == -1){
                types.push(e.type)
            }
        });
        res.json({products:Re,types:types});
    });


    app.get("/api.products/:id", function(req, res) {
        var id =req.params.id
        res.json(db.get(`products[${id}]`).value());
    });

    app.get("/api.cats/:cat", function(req, res) {
        var cat =req.params.cat
        res.json(db.get('products').filter({type:cat}).value());
    });


    app.get("/api.homePage", function(req, res) {
        res.json(db.get('homepage').value());
    });



    app.post("/",Login);
    app.post("/Register",(req,res)=>{
        var {name,pass,email}=req.body

        var Email=db.get('users')
        .filter({email:email})
        .value()

        if(Email.length==0){
            db.get("users")
            .push({name:name,pass:pass,email:email})
            .write()


            var Email=db.get('users')
            .filter({email:email})
            .value()

            console.log(Email)
            req.session.UserData = {
                email:email,
                name:Email[0].name
            }
            res.redirect("../")

        }else{
            res.send("EMail is already registered")
        }
    })
    app.post("/_addToCart",(req,res)=>{
        var {item}=req.body
        if(!req.session.cart){
            req.session.cart=[]
        }
        req.session.cart.push(item)

        res.json({item:item})

    })
    app.post("/_RemoveFromCart",(req,res)=>{
        var {item}=req.body
        req.session.cart.splice(req.session.cart.findIndex(e=>e==item.id),1)

        res.json({item:item})

    })
    app.post("/_Purchase",(req,res)=>{
        var {Data,id}=req.body
        db.get("purchases")
            .push({
                cons: id,
                prod:Data,
                status: "ddf"
            })
            .write()

        res.send({aa:"Sucess"})
        req.session.cart=[]

    })
    app.post("/_getCart",(req,res)=>{
        var{id}=req.body
        var Cart=db.filter({_id:id}).get("cart").value()
    })

    app.get('/a',(req,res)=>{
        res.render("a")
    })

}   
    
        

exports.rout=rout