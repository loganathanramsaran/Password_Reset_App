const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Log before registering routes:
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
