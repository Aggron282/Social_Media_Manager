const router = require("express").Router();
const socialController = require("../controllers/social.js");


router.get("/auth/meta/userId/:userId", socialController.MetaStart);
router.get("/meta/callback", socialController.MetaCallback);
router.get('/auth/linkedin/callback', socialController.LinkedinCallback);

router.get('/auth/facebook/userId/:id', socialController.MetaStart);
router.get('/auth/linkedin/userId/:id', socialController.LinkedinStart);
router.get('/auth/instagram/userId/:id', socialController.MetaStart);
router.get('/auth/fblogin/userId/:id', socialController.FacebookLoginStart);
router.get('/auth/fblogin/callback', socialController.FacebookLoginCallback);
router.get('/user', socialController.GetUser);

module.exports = router;
