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


    app.get(['/','/store','/login','/register'], function(req, res) {
       
        if(req.session.UserData){
            var full_data=
            db.get("users").filter({
                email:req.session.UserData.email
            }).value()[0]
            console.log(full_data)
            res.render('index',{sessionID:req.sessionID,data:{email:full_data.email,name:full_data.name}});

        }
        
        res.render('index',{sessionID:null,data:null});
    });

    app.get("/api.products/", function(req, res) {
        var products=db.get('products').value()
        var types=[]
        var Re=[]
        products.forEach((e,i) => {
            e["id"]=i
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


        
        
    })

}   
    
        

exports.rout=rout
