const express = require('express');
const app = express.Router();

const middlewareAuth = require('../middleware/authentication');
const PedidoController = require('../controllers/pedido.controller');

app.post('/pedido/crear', middlewareAuth.ensureAuth, PedidoController.CrearPedido) // POST /pedido/crear
app.get('/pedido/getall', middlewareAuth.ensureAuth, PedidoController.GetAll) // GET /pedido/getall
app.get('/pedido/:id', middlewareAuth.ensureAuth, PedidoController.ReadById) // GET /pedido/{id}
app.get('/pedido/:id/factura', middlewareAuth.ensureAuth, PedidoController.GetFactura) // GET /pedido/{id}/factura

module.exports = app;