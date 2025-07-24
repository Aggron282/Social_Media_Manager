const router = require("express").Router();
const socialController = require("../controllers/social.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/auth/meta/userId/", socialController.MetaStart);
router.get("/meta/callback", socialController.MetaCallback);
router.get('/auth/linkedin/callback', socialController.LinkedinCallback);


router.post("/api/upload", upload.array("images"), (req, res) => {
  res.json({ files: req.files });
});

router.get('/api/auth/facebook/userId/', socialController.MetaStart);
router.get('/api/auth/linkedin/userId/', socialController.LinkedinStart);
router.get('/api/auth/instagram/userId/', socialController.MetaStart);
router.get('/api/auth/fblogin/userId/', socialController.FacebookLoginStart);
router.get('/api/auth/fblogin/callback', socialController.FacebookLoginCallback);
router.get('/api/user', socialController.GetUser);

module.exports = router;
