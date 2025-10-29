const mongoose = require('mongoose')
const FeedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  rating: { type: Number },
  createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Feedback', FeedbackSchema)
