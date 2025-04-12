// This starts the LinkedIn OAuth flow
const LINKEDIN_CLIENT = process.env.LINKEDIN_CLIENT;
const LINKEDIN_SECRET = process.env.LINKEDIN_SECRET;
const LINKEDIN_REDIRECT = process.env.LINKEDIN_REDIRECT;
const axios = require("axios");
const User = require("./../models/User.js");
const mongoose = require("mongoose");

const LinkedinStart = (req, res) => {
  const scope = 'w_member_social';
  const state = 'optional_csrf_token';

  const userId = req.params.id;

  req.session.userId = userId;

  const authURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT)}&scope=${encodeURIComponent(scope)}&state=${state}`;

  res.redirect(authURL);
};

const GetUser = async (req,res) => {
  console.log(req.params)
  try{
    var userId = req.params.userId;

    userId = new mongoose.Types.ObjectId(userId);
    var foundUser = await User.findOne({_id:userId});

    if(foundUser){
      return res.status(200).json({user:foundUser, error:null});
    }
    else{
      return res.status(500).json({user:null,error:"No user found"});
    }
  }
  catch(error){
    return res.status(500).json({user:null,error:error});
  }

}

const META_CLIENT = process.env.META_CLIENT;
const META_SECRET = process.env.META_SECRET;
const META_REDIRECT = process.env.META_REDIRECT;

const MetaStart = (req, res) => {

  const scope = 'public_profile,email,pages_show_list,pages_read_engagement,instagram_basic';

  const state = 'fb_csrf_token';

  const userId = req.params.id;
  console.log(req.body);
  req.session.userId = userId;

  const authURL = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${META_CLIENT}&redirect_uri=${encodeURIComponent(META_REDIRECT)}&state=${state}&scope=${encodeURIComponent(scope)}`;

  res.redirect(authURL);

};

const LinkedinCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) return res.status(400).send("Missing code");

  try {
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: LINKEDIN_REDIRECT,
        client_id: LINKEDIN_CLIENT,
        client_secret: LINKEDIN_SECRET,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, expires_in } = tokenResponse.data;

    var userId = req.session.userId;

    const user = await User.findById(userId);

    if (!user) return res.status(401).send("User not found");

    const platform = "linkedin";

    const existing = user.socialMedia.find(acc => acc.platform === platform);

    if (existing) {
      existing.key.accessToken = access_token;
      existing.key.expiresAt = new Date(Date.now() + expires_in * 1000);
    }
    else {

      user.socialMedia.push({
        platform,
        username: "",
        password: "",
        key: {
          accessToken: access_token,
          expiresAt: new Date(Date.now() + expires_in * 1000),
        },

      });

    }

    await user.save();

    req.session.linkedinAccessToken = access_token;
    req.session.linkedinTokenExpiry = Date.now() + expires_in * 1000;

    res.redirect(`http://localhost:3000/dashboard/${userId}`);

  } catch (error) {
    console.error('Error exchanging code:', error.response?.data || error.message);
    res.status(500).send('Failed to link LinkedIn');
  }

};

module.exports.GetUser = GetUser;
module.exports.LinkedinCallback = LinkedinCallback;
module.exports.LinkedinStart = LinkedinStart;
module.exports.MetaStart = MetaStart;
