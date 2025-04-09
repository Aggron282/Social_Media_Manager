require('dotenv').config();

var port = process.env.PORT || 5000;
var express = require("express");
var session = require("express-session");
var path = require("path");
var cors = require("cors");
const MongoStore = require("connect-mongo");
var mongoose = require("mongoose");
var authRoutes = require("./routes/auth_routes.js")
var socialRoutes = require("./routes/social_routes.js")

var app = express();

app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET || 'iofjrme',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60,
  })
}));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(authRoutes);

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.listen(port,()=>{
  console.log("App is running");
});
