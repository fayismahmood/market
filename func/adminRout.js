var {db,sessionDB}=require("./db")

adminRout=(app)=>{
    app.get(['/admin',"/admin/Purchases","/admin/Products","/admin/Design"], function(req, res) {
        res.render("admin")
    })

    app.post("/api.purchases",(req,res)=>{
        var Data=db.get("purchases").value()
        console.log(Data)
        res.json({data:Data})
    })


}


exports.adminRout=adminRout