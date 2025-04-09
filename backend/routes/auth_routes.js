var router = require("express").Router();
var authController = require("./../controllers/auth.js");

router.post("/login",authController.Login);
router.post("/create_account",authController.CreateAccount);


module.exports = router;
