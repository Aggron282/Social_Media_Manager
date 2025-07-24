// This starts the LinkedIn OAuth flow
const LINKEDIN_CLIENT = process.env.LINKEDIN_CLIENT;
const LINKEDIN_SECRET = process.env.LINKEDIN_SECRET;
const LINKEDIN_REDIRECT = process.env.LINKEDIN_REDIRECT;
const axios = require("axios");
const User = require("./../models/User.js");
const mongoose = require("mongoose");

const front_port = process.env.REACT_APP_API || "http://localhost:3000/"
const back_port = process.env.REACT_APP_API || "http://localhost:5000/"

const FB_CLIENT = process.env.FB_LOGIN_ID;
const FB_SECRET = process.env.FB_SECRET;
const FB_REDIRECT = process.env.FB_REDIRECT;

const FacebookLoginStart = (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).send("Unauthorized");
  console.log(userId)
  const scope = 'public_profile';
  const authURL = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FB_CLIENT}&redirect_uri=${encodeURIComponent(FB_REDIRECT)}&state=custom_token&scope=${encodeURIComponent(scope)}`;

  res.redirect(authURL);
};


const PostToFacebookPage = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId);
    const fb = user.socialMedia.find(acc => acc.platform === "facebook");

    if (!fb || !fb.meta?.pageId || !fb.meta?.pageToken) {
      return res.status(400).send("Facebook Page not linked");
    }

    const { message } = req.body;

    const result = await axios.post(`https://graph.facebook.com/v18.0/${fb.meta.pageId}/feed`, {
      message,
      access_token: fb.meta.pageToken,
    });

    res.status(200).json({ success: true, postId: result.data.id });
  } catch (error) {
    console.error("Post to FB failed:", error.response?.data || error.message);
    res.status(500).send("Failed to post to Facebook");
  }
};

const PostToInstagram = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId);
    const fb = user.socialMedia.find(acc => acc.platform === "facebook");

    if (!fb || !fb.meta?.instagramId || !fb.meta?.pageToken) {
      return res.status(400).send("Instagram not linked");
    }

    const { image_url, caption } = req.body;

    // Step 1: Create media object
    const createMedia = await axios.post(
      `https://graph.facebook.com/v18.0/${fb.meta.instagramId}/media`,
      {
        image_url,
        caption,
        access_token: fb.meta.pageToken,
      }
    );

    // Step 2: Publish media
    const creationId = createMedia.data.id;
    const publishMedia = await axios.post(
      `https://graph.facebook.com/v18.0/${fb.meta.instagramId}/media_publish`,
      {
        creation_id: creationId,
        access_token: fb.meta.pageToken,
      }
    );

    res.status(200).json({ success: true, postId: publishMedia.data.id });
  } catch (error) {
    console.error("Post to IG failed:", error.response?.data || error.message);
    res.status(500).send("Failed to post to Instagram");
  }
};



const FacebookLoginCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const tokenRes = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
      params: {
        client_id: process.env.META_CLIENT,
        client_secret: process.env.META_SECRET,
        redirect_uri: 'http://localhost:5000/auth/fblogin/callback',
        code
      }
    });

    const access_token = tokenRes.data.access_token;

    // Optionally exchange for long-lived token
    const longTokenRes = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
      params: {
        grant_type: 'fb_exchange_token',
        client_id: process.env.META_CLIENT,
        client_secret: process.env.META_SECRET,
        fb_exchange_token: access_token,
      }
    });

    const longLivedToken = longTokenRes.data.access_token;
    console.log("dwjon")
    // You can now use this token to fetch user/page data or save it in DB
    console.log("Long-lived FB Token:", longLivedToken);
    var domain = process.env.REACT_APP_API;
    if(!process.env.REACT_APP_API){
      domain = "http://localhost:3000";
    }
    console.log(`${domain}/dashboard`)
    // ✅ FIX: Respond or Redirect the user after successful login
    res.redirect(`${domain}/dashboard`); // or wherever your frontend is
  } catch (err) {
    console.error("Facebook login callback failed:", err);
    res.status(500).send("Facebook login failed");
  }
};

const MetaCallback = async (req, res) => {
  const { code } = req.query;
  const userId = req.session.userId;
  if (!userId || !code) return res.status(400).send("Missing credentials");

  try {
    const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
      params: {
        client_id: META_CLIENT,
        client_secret: META_SECRET,
        redirect_uri: META_REDIRECT,
        code,
      }
    });

    const { access_token, expires_in } = tokenResponse.data;
    const pagesRes = await axios.get('https://graph.facebook.com/v18.0/me/accounts', {
      params: { access_token }
    });

    const page = pagesRes.data.data[0];
    if (!page) throw new Error("No Facebook pages found");

    const igRes = await axios.get(`https://graph.facebook.com/v18.0/${page.id}`, {
      params: {
        access_token: page.access_token,
        fields: 'instagram_business_account'
      }
    });

    const instagramId = igRes.data.instagram_business_account?.id || null;
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

    if (existing) Object.assign(existing, newData);
    else user.socialMedia.push(newData);

    await user.save();
    res.redirect(`${front_port}dashboard/`);
  } catch (err) {
    console.error("Facebook OAuth error:", err.response?.data || err.message);
    res.status(500).send("Failed to complete Facebook OAuth");
  }
};

const LinkedinStart = (req, res) => {
  const scope = 'w_member_social';
  const state = 'optional_csrf_token';
  const userId = req.session.userId;

  if (!userId) return res.status(401).send("Unauthorized");

  const authURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT)}&scope=${encodeURIComponent(scope)}&state=${state}`;

  res.redirect(authURL);
};

const GetUser = async (req,res) => {
  try {
    const userId = req.session.userId;
    console.log(userId,req.session)
    if (!userId) return res.status(401).json({ user: null, error: "Unauthorized" });

    const foundUser = await User.findById(userId);
    if (foundUser) {
      return res.status(200).json({ user: foundUser, error: null });
    } else {
      return res.status(404).json({ user: null, error: "No user found" });
    }
  } catch (error) {
    return res.status(500).json({ user: null, error });
  }
};



const META_CLIENT = process.env.META_CLIENT;
const META_SECRET = process.env.META_SECRET;
const META_REDIRECT = process.env.META_REDIRECT;

const MetaStart = (req, res) => {
  const scope = 'public_profile';
  const state = 'fb_csrf_token';
  const userId = req.session.userId;

  if (!userId) return res.status(401).send("Unauthorized");

  const authURL = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${META_CLIENT}&redirect_uri=${encodeURIComponent(META_REDIRECT)}&state=${state}&scope=${encodeURIComponent(scope)}`;
  res.redirect(authURL);
};

const LinkedinCallback = async (req, res) => {
  const { code } = req.query;
  const userId = req.session.userId;

  if (!code || !userId) return res.status(400).send("Missing code or session");

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
    const user = await User.findById(userId);
    if (!user) return res.status(401).send("User not found");

    const platform = "linkedin";
    const existing = user.socialMedia.find(acc => acc.platform === platform);

    if (existing) {
      existing.key.accessToken = access_token;
      existing.key.expiresAt = new Date(Date.now() + expires_in * 1000);
    } else {
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
    res.redirect(`${front_port}dashboard/`);

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
