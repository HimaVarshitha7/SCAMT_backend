const express = require('express')
const router = express.Router()
const Service = require('../models/Service')

router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 })
    res.json(services)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body
    const s = new Service({ name, description })
    await s.save()
    res.json(s)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

module.exports = router
