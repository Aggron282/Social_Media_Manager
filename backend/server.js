var port = process.env.PORT || 3000;

var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var path = require("path");

var userRoutes = require("./routes/user_routes.js")
var socialRoutes = require("./routes/social_routes.js")

var app = express();

app.use(userRoutes);
app.use(socialRoutes);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.listen(port,()=>{
  console.log("App is running");
});
