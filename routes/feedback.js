const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Feedback = require('../models/Feedback')

router.post('/', auth, async (req, res) => {
  try {
    const { message, rating } = req.body
    const fb = new Feedback({ user: req.user.id, message, rating })
    await fb.save()
    res.json(fb)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const items = await Feedback.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(items)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

module.exports = router
