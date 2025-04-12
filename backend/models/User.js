const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the SocialMedia schema
const SocialMediaSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  username: { type: String, required: false },
  password: { type: String, required: false },
  key: {
  accessToken: String,
  expiresAt: Date,
  }
});

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  socialMedia: [SocialMediaSchema], // Array of social media accounts
});

// Middleware to hash password before saving it
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

// Method to check if password matches
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
