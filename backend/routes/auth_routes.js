var router = require("express").Router();
var authController = require("./../controllers/auth.js");

router.post("/auth/login",authController.Login);
router.post("/auth/create_account",authController.CreateAccount);


module.exports = router;
