const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the SocialMedia schema
const SocialMediaSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  username: { type: String },
  password: { type: String },
  key: {
    accessToken: String,
    expiresAt: Date,
  },
  meta: {
    pageId: String,
    pageToken: String,
    instagramId: String,
  }
});

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  socialMedia: [SocialMediaSchema],
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to validate password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
