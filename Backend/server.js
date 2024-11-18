const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path-to-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Middleware to verify token and role
const verifyRole = (requiredRole) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Unauthorized: No token provided');

  try {
    const decodedToken = await auth.verifyIdToken(token);
    if (decodedToken.role !== requiredRole) {
      return res.status(403).send('Unauthorized: Insufficient permissions');
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).send('Unauthorized: Invalid token');
  }
};

// Super-Admin Endpoint: Add General-Admin
app.post('/add-admin', verifyRole('super-admin'), async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await auth.createUser({ email, password });
    await auth.setCustomUserClaims(user.uid, { role });
    res.status(200).send('Admin added successfully');
  } catch (error) {
    res.status(500).send('Error adding admin: ' + error.message);
  }
});

// Super-Admin Endpoint: Remove Admin Rights
app.post('/remove-admin', verifyRole('super-admin'), async (req, res) => {
  const { uid } = req.body;
  try {
    await auth.setCustomUserClaims(uid, null);
    res.status(200).send('Admin rights removed');
  } catch (error) {
    res.status(500).send('Error removing admin: ' + error.message);
  }
});

// General-Admin Endpoint: View Profile
app.get('/profile', verifyRole('general-admin'), (req, res) => {
  res.status(200).send({
    name: req.user.name || 'General Admin',
    role: req.user.role,
    email: req.user.email,
  });
});

// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
