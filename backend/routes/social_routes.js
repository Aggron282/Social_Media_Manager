const router = require("express").Router();
const socialController = require("../controllers/social.js");

router.get('/auth/linkedin/userId/:id', socialController.LinkedinStart);
router.get('/auth/facebook/userId/:id', socialController.MetaStart);
router.get('/auth/instagram/userId/:id', socialController.MetaStart);

router.get('/auth/linkedin/callback', socialController.LinkedinCallback);


router.get('/user/:userId', socialController.GetUser);

module.exports = router;
