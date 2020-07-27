var express = require('express');
var app = express();

var rout= require("./func/routs")


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('dist'))
// use res.render to load up an ejs view file

// index page 

rout.rout(app)
app.listen(8080);

