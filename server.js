require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const feedbackRoutes = require('./routes/feedback');
const serviceRoutes = require('./routes/services');

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB().then(() => console.log("MongoDB Connected (Atlas)"));


app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => res.json({ status: 'ok' }));


module.exports = app;
