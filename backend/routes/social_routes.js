const router = require("express").Router();
const socialController = require("../controllers/social.js");


router.get("/auth/meta/userId/", socialController.MetaStart);
router.get("/meta/callback", socialController.MetaCallback);
router.get('/auth/linkedin/callback', socialController.LinkedinCallback);

router.get('/auth/facebook/userId/', socialController.MetaStart);
router.get('/auth/linkedin/userId/', socialController.LinkedinStart);
router.get('/auth/instagram/userId/', socialController.MetaStart);
router.get('/auth/fblogin/userId/', socialController.FacebookLoginStart);
router.get('/auth/fblogin/callback', socialController.FacebookLoginCallback);
router.get('/user', socialController.GetUser);

module.exports = router;
