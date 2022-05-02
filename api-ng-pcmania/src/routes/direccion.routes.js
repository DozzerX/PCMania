const express = require('express');
const app = express.Router();

const middlewareAuth = require('../middleware/authentication');
const DireccionController = require('../controllers/direccion.controller');

app.get('/direccion/:id', middlewareAuth.ensureAuth, DireccionController.ReadById); // GET /direccion/{id}
app.get('/direcciones', middlewareAuth.ensureAuth, DireccionController.ReadAll); // GET /direccion/readall
app.post('/direccion/crear', middlewareAuth.ensureAuth, DireccionController.CrearDireccion); // POST /direccion/crear
app.put('/direccion/modificar', middlewareAuth.ensureAuth, DireccionController.ModificarDireccion); // PUT /direccion/modificar
app.delete('/direccion/borrar/:id',middlewareAuth.ensureAuth, DireccionController.BorrarDireccion); // DELETE /direccion/borrar/{id}

module.exports = app;