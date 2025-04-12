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


app.use(cors({
  origin: "http://localhost:3000",  // Your React frontend
  credentials: true                 // ✅ allow cookies
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
   domain: "socialapp.local",
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Only true in production with HTTPS
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'lax', // ✅ THIS IS IMPORTANT
    path: '/',       // ✅ ensures cookie applies to all routes
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'session',
    ttl: 14 * 24 * 60 * 60,
  })
}));

const path = require("path");


app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(authRoutes);
app.use(socialRoutes);

app.use(express.json());

app.get('/data-deletion', (req, res) => {
  res.status(200).send(`
    <html>
      <head><title>Data Deletion</title></head>
      <body>
        <h1>Data Deletion Request</h1>
        <p>If you want your data removed from our system, please email us at <strong>you@example.com</strong>.</p>
        <p>We’ll respond within 48 hours.</p>
      </body>
    </html>
  `);
});

app.use(express.static(path.join(__dirname, "build")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.listen(port,()=>{
  console.log("App is running");
});
