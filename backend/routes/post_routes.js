const express = require("express");
const router = express.Router();
const { createPost, getPostsByUser } = require("../controllers/post");
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post("/api/posts", upload.array('images', 5), createPost);
router.get("/api/posts", getPostsByUser);

module.exports = router;
