const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-database-name>.firebaseio.com"
});

const auth = admin.auth();
const firestore = admin.firestore();
