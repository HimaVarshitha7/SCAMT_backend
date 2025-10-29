const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const Complaint = require('../models/Complaint');

// 📂 Setup storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // create this folder in your backend root
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type. Only JPG, PNG, GIF allowed.'));
  }
});

// 🧾 POST complaint with optional image
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { flat, service, other, description } = req.body;
    const complaint = new Complaint({
      user: req.user.id,
      flat,
      service,
      other,
      description,
      image: req.file ? req.file.filename : null
    });
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 🧾 GET all user complaints
router.get('/', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
