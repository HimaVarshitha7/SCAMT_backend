require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const feedbackRoutes = require('./routes/feedback');
const serviceRoutes = require('./routes/services');

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://scamt-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ Connect MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB Connected (Atlas)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/services', serviceRoutes);

// ✅ Root route for health check
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Backend running fine ✅' }));

// ✅ DB test route
app.get('/testdb', async (req, res) => {
  const state = mongoose.connection.readyState;
  const status = ["disconnected", "connected", "connecting", "disconnecting"][state];
  res.json({ dbStatus: status });
});

// ✅ Handle 404 routes gracefully (no more HTML errors)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Start Server (Render auto-injects PORT)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running successfully on port ${port}`);
});

module.exports = app;
