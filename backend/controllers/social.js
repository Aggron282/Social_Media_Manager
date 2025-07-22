// This starts the LinkedIn OAuth flow
const LINKEDIN_CLIENT = process.env.LINKEDIN_CLIENT;
const LINKEDIN_SECRET = process.env.LINKEDIN_SECRET;
const LINKEDIN_REDIRECT = process.env.LINKEDIN_REDIRECT;
const axios = require("axios");
const User = require("./../models/User.js");
const mongoose = require("mongoose");

const front_port = process.env.DOMAIN || "http://localhost:3000/"
const back_port = process.env.DOMAIN || "http://localhost:5000/"

const FB_CLIENT = process.env.FB_LOGIN_ID;
const FB_SECRET = process.env.FB_SECRET;
const FB_REDIRECT = process.env.FB_REDIRECT;

const FacebookLoginStart = (req, res) => {
  const userId = req.params.id;
  req.session.userId = userId;

  const scope = 'public_profile';

  const authURL = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FB_CLIENT}&redirect_uri=${encodeURIComponent(FB_REDIRECT)}&state=custom_token&scope=${encodeURIComponent(scope)}`;

  res.redirect(authURL);
};

const FacebookLoginCallback = async (req, res) => {
  const { code } = req.query;
  const userId = req.session.userId;

  try {
    const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
      params: {
        client_id: FB_CLIENT,
        client_secret: FB_SECRET,
        redirect_uri: FB_REDIRECT,
        code,
      }
    });

    const { access_token } = tokenResponse.data;

    // Save or use this token however you want (store to user etc.)
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const platform = "facebook";
    user.socialMedia.push({
      platform,
      key: {
        accessToken: access_token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      }
    });

    await user.save();

    res.redirect(`${front_port}dashboard/${userId}`);
  } catch (err) {
    console.error("Facebook login error:", err.response?.data || err.message);
    res.status(500).send("Login failed");
  }
};

const MetaCallback = async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send("Missing code");

  try {
    // Step 1: Exchange code for access token
    const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
      params: {
        client_id: META_CLIENT,
        client_secret: META_SECRET,
        redirect_uri: META_REDIRECT,
        code,
      }
    });

    const { access_token, expires_in } = tokenResponse.data;

    // Step 2: Fetch user's pages
    const pagesRes = await axios.get('https://graph.facebook.com/v18.0/me/accounts', {
      params: {
        access_token: access_token
      }
    });

    const page = pagesRes.data.data[0];
    if (!page) throw new Error("No Facebook pages found for this user");

    // Step 3: Get Instagram business account ID from page
    const igRes = await axios.get(`https://graph.facebook.com/v18.0/${page.id}`, {
      params: {
        access_token: page.access_token,
        fields: 'instagram_business_account'
      }
    });

    const instagramId = igRes.data.instagram_business_account?.id || null;
    console.log(instagramId)
    // Step 4: Save everything to user
    const userId = req.session.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const platform = "facebook";
    const existing = user.socialMedia.find(acc => acc.platform === platform);

    const newData = {
      platform,
      username: "",
      password: "",
      key: {
        accessToken: access_token,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      },
      meta: {
        pageId: page.id,
        pageToken: page.access_token,
        instagramId: instagramId
      }
    };

    if (existing) {
      Object.assign(existing, newData);
    } else {
      user.socialMedia.push(newData);
    }

    await user.save();

    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/dashboard/${userId}`);
  } catch (err) {
    console.error("Facebook OAuth error:", err.response?.data || err.message);
    res.status(500).send("Failed to complete Facebook OAuth");
  }
};

const LinkedinStart = (req, res) => {
  const scope = 'w_member_social';
  const state = 'optional_csrf_token';

  const userId = req.params.id;

  req.session.userId = userId;

  const authURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT)}&scope=${encodeURIComponent(scope)}&state=${state}`;

  res.redirect(authURL);
};

const GetUser = async (req,res) => {

  try{
    var userId = req.params.id;
    console.log(userId)
    userId = new mongoose.Types.ObjectId(userId);
    var foundUser = await User.findOne({_id:userId});
    console.log(foundUser)
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

  const scope = 'public_profile';

  const state = 'fb_csrf_token';

  const userId = req.params.id;

  req.session.userId = userId;

  const authURL = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${META_CLIENT}&redirect_uri=${encodeURIComponent(META_REDIRECT)}&state=${state}&scope=${encodeURIComponent(scope)}`;
  console.log(userId)
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

    res.redirect(`${front_port}dashboard/${userId}`);

  } catch (error) {
    console.error('Error exchanging code:', error.response?.data || error.message);
    res.status(500).send('Failed to link LinkedIn');
  }

};

module.exports.GetUser = GetUser;
module.exports.MetaCallback = MetaCallback;
module.exports.LinkedinCallback = LinkedinCallback;
module.exports.LinkedinStart = LinkedinStart;
module.exports.FacebookLoginStart = FacebookLoginStart;
module.exports.FacebookLoginCallback = FacebookLoginCallback;

module.exports.MetaStart = MetaStart;
