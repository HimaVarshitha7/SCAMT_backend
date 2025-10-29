const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flat: { type: String },
  service: { type: String },
  other: { type: String },
  description: { type: String },
  image: { type: String }, 
  status: { type: String, default: 'open' },
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
