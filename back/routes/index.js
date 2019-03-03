'use strict'

const express = require('express');
const usersCtrl = require('../controllers/users');
const api = express.Router();

//USUARIOS /api/...
api.post('/signup', usersCtrl.signUp); //Crear un Usuario
api.post('/signin', usersCtrl.signIn); //Iniciar Sesion

module.exports = api
