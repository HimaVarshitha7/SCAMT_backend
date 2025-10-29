const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['resident', 'worker', 'security', 'admin', 'superadmin'], required: true },
  community: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
