const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
const config = require('./config');

admin.initializeApp({
  credential: admin.credential.cert(config.admin),
  databaseURL: config.databaseURL
});

firebase.initializeApp(config.firebase);

exports.signUp = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(500).send("What are you trying baby?");
  }
  const email = req.body.email;
  const pass = req.body.pass;
  admin.auth().createUser({
    email: email,
    emailVerified: true,
    password: pass
  })
  .then(userRecord => {
    return res.send({ message: `User ${email} created, id: ${userRecord.uid}` });
  })
  .catch(error => {
    return res.send({ error: `Error creating the new user: ${error}` });
  })
  return 1;
});

exports.signIn = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(500).send("What are you trying baby?");
  }
  const email = req.body.email;
  const pass = req.body.pass;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(userRecord => {
      return res.send({ message: userRecord });
    })
    .catch(error => {
      return res.send({ message: error });
    });
  return 1;
});

exports.signOut = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(500).send("What are you trying baby?");
  }
  firebase.auth().signOut()
    .then(userRecord => {
      return res.send({ message: userRecord });
    })
    .catch(error => {
      return res.send({ message: error });
    });
  return 1;
});