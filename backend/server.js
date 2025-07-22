const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

var port = process.env.PORT || 5000;
var express = require("express");
var session = require("express-session");
var cors = require("cors");
const MongoStore = require("connect-mongo");
var mongoose = require("mongoose");
var authRoutes = require("./routes/auth_routes.js")
var socialRoutes = require("./routes/social_routes.js")

var app = express();

app.use(express.static(path.join(__dirname, "../frontend/build")));


// Allow requests from your frontend domain
const allowedOrigins = [
  'http://localhost:3000',
  'https://socialmediamanager-4e8ed621d69b.herokuapp.com'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));



app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
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


// Serve static files from React
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(authRoutes);
app.use(socialRoutes);



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

const frontendRoutes = [
  "/",
  "/dashboard/:id",
  "/login",
  "/create_account",
  "/forgot"
];

frontendRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
});





mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


  app.use(express.static(path.join(__dirname, "client/build")));

  // All other routes (not API/backend) go to React
  app.get(/^\/(?!api|auth|login|social|dashboard|static).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });

app.listen(port,()=>{
  console.log("App is running");
});
