const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const admin = require('firebase-admin');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Admin initialization (using service account file if present)
try {
  const serviceAccountPath = path.join(__dirname, 'firebase-service-account.json');
  if (fs.existsSync(serviceAccountPath) && !admin.apps.length) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized');
  }
} catch (e) {
  console.warn('Firebase Admin initialization skipped:', e?.message || e);
}

// Auth middleware: verify Firebase ID token from Authorization: Bearer <token>
async function verifyFirebaseToken(req, res, next) {
  try {
    if (!admin.apps.length) {
      return res.status(500).json({ message: 'Auth not configured on server' });
    }
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'Missing auth token' });
    }
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { uid: decoded.uid };
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ message: 'Invalid auth token' });
  }
}

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
// Secure enrollment routes
app.use('/api/enroll', verifyFirebaseToken, require('./routes/enrollments'));
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
