const User = require("./../models/User.js");
const bcrypt = require("bcrypt");
const front_port = process.env.DOMAIN || "http://localhost:3000/"
const back_port = process.env.DOMAIN || "http://localhost:5000/"

const Login = async (req, res) => {
  try {
    console.log(req.body)

    if(req.body){
      const foundUser = await User.findOne({ username: req.body.username });

      if (!foundUser) {
        return res.json({ error: "No user found with this username", user: null });
      }

      const match = await foundUser.matchPassword(req.body.password);

      if (match) {
        req.session.userId = foundUser._id;
        console.log(req.session , "s")
        res.json({ error: null, userId: foundUser._id });
      } else {
        res.json({ error: "Invalid Credentials", user: null });
      }
    }
    else{
      console.log("Request is NULL")
      throw new Error("Request is NULL");
    }


  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: error, user: null });
  }

};

const CreateAccount = async (req, res) => {
  try {

    const foundUser = await User.findOne({ username: req.body.username });

    if (foundUser) {
      return res.json({ error: "Found user with this username", user: null });
    }

    console.log(foundUser);

    const { username, password, email,name } = req.body;

    const new_user = new User({
         name,
         username,
         password,
         email
    });

    console.log(new_user);

    await new_user.save();
    req.session.userId = new_user._id;
    return res.json({
      error: null,
      userId: new_user._id
    });

  } catch (error) {

    res.status(500).json({ error: error.message || error, user: null });
  }
};


module.exports.Login = Login;
module.exports.CreateAccount = CreateAccount;
