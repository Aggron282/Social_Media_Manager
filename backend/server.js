const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const port = process.env.PORT || 5000;
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth_routes.js");
const socialRoutes = require("./routes/social_routes.js");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://socialmediamanager-4e8ed621d69b.herokuapp.com"
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Session
app.set("trust proxy", 1);
app.use(session({
  secret: process.env.SESSION_SECRET || "secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set to true if behind HTTPS in production
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "session",
    ttl: 14 * 24 * 60 * 60
  })
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Static file serving (React build)
app.use(express.static(path.join(__dirname, "client/build")));

// API Routes
app.use(authRoutes);
app.use(socialRoutes);

// Data deletion policy route
app.get("/data-deletion", (req, res) => {
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

// Handle malformed URL errors gracefully
app.use((req, res, next) => {
  try {
    decodeURIComponent(req.path);
    next();
  } catch (err) {
    if (err instanceof URIError) {
      console.error("Malformed URL:", req.url);
      return res.status(400).send("Malformed URL");
    }
    next(err);
  }
});

// Catch-all route for React frontend (client-side routing support)


// Start server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
