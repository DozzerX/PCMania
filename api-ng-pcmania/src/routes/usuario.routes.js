const express = require('express')
const app = express.Router()

const middlewareAuth = require('../middleware/authentication')
const UsuarioController = require('../controllers/usuario.controller')

app.get('/usuario/:id', middlewareAuth.ensureAuth, UsuarioController.GetUserById) // GET /usuario/{id}
app.put('/usuario/modificar', middlewareAuth.ensureAuth, UsuarioController.ModificarUsuario) // PUT /usuario/update
app.post('/usuario/cambiarpass', middlewareAuth.ensureAuth, UsuarioController.ModificarPassword) // POST /usuario/cambiarpass


module.exports = app;
