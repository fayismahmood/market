const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)


db.defaults({ admins: [
                        {name:"dfad",pass:"adfd",email:"asdfdf"},
                        {name:"dfad",pass:"adfd",email:"asdfdf"}
                    ], 
                users: [
                    {name:"dfad",pass:"adfd",email:"asdfdf"},
                    {name:"dfad",pass:"adfd",email:"asdfdf"}
                ],products:[
                    {name:"dfad",cat:"a",avail:"adfd",price:"asdfdf"},
                    {name:"dfad",cat:"b",avail:"adfd",price:"asdfdf"}
                ],purchases:[
                    {cons:"dfad",prod:"adfd",cont:"asdfdf",status:"ddf"},
                    {cons:"dfad",prod:"adfd",cont:"asdfdf",status:"ddf"},
                ],homepage:{
                    slides:["ADfdsfadf","adfdf","Adsff"],
                    bestSell:["dfdf","sdf","asdff"]
                }
             })
  .write()