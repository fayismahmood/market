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
                 name:Email[0].name
             }
             res.redirect("../")
             
         }else{
             res.redirect("/Login/?status=Invalid Password")
             

         }
     }
 }


 exports.Login=Login