const express = require('express');
const app = express.Router();

const AuthController = require('../controllers/auth.controller');

app.post('/auth/register',AuthController.Register ); // POST /auth/register
app.post('/auth/login', AuthController.Login); // POST /auth/login

module.exports = app;