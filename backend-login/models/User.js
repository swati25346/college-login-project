const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'staff'], required: true },
  //name: { type: String },
  //email: { type: String },
  //contactNumber: { type: String },
  resume: { type: String }, // Store file path for the resume
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
