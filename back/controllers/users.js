'use strict'

const admin = require('firebase-admin');
const config = require('../config');

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

function signUp (req, res) {
  admin.auth().createUser({
    email: req.body.email,
    emailVerified: true,
    phoneNumber: req.body.phone,
    password: req.body.password,
    displayName: req.body.name,
    photoURL: req.body.photo,
    disabled: false
  }).then(userRecord => {
    console.log(`Successfully created new user: ${userRecord.uid}`);
  }).catch(error => {
    console.log(`Error creating new user ${error}`);
  })
}

function signIn (req, res) {
  User.find({ user: req.body.user, password: req.body.password }, (err, user) => {
    if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
    if(!user.length) return res.status(404).send({ message: `Usuario o contraseña incorrecto` })
    req.user = user
    res.status(200).send({ token: service.createToken(user) })
  })
}

module.exports = {
  getUsers,
  signUp,
  signIn
}
