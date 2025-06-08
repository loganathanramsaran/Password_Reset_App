const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Allow both localhost and Netlify
const allowedOrigins = [
  'http://localhost:3000',
  'https://passwordresetapk.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

console.log('📦 Registering routes from userRoutes.js');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Password Reset App is Running');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.listen(PORT, () => {
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
});
