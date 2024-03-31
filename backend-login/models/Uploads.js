const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  username: { type: String, required: true },
  filename: { type: String, required: true },
  
});

module.exports = mongoose.model('Upload', uploadSchema);
