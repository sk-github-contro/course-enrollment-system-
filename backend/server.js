const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sohamUlwe305:Soham305Ulwe@clusterulwe.49hjd.mongodb.net/course_enrollment?retryWrites=true&w=majority&appName=clusterUlwe';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enroll', require('./routes/enrollments'));
app.use('/api/auth', require('./routes/auth'));

// Serve static files from Angular app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist/client')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/client', 'index.html'));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
