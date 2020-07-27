var {db}=require("../db") 

function Login (req, res) {
    var {email,pass}=req.body
    

    console.log(email,pass)
    var Email=db.get('users')
    .filter({email:email})
    .value()
     console.log(Email)
    
     if(Email.length==0){
         res.redirect("/Login/?status=No Such user")
     }else{
         if(Email[0].pass==pass){
             req.session.UserData = {
                 email:email,
                 email:Email[0].email
             }
             res.redirect("../")
             console.log("erdadf",Email[0].pass,pass)
         }else{
             res.redirect("/Login/?status=Invalid Password")
             console.log("erdadf",Email,pass)

         }
     }
 }


 exports.Login=Login