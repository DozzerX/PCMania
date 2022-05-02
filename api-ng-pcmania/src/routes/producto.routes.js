const express = require('express');
const app = express.Router();

const ProductoController = require('../controllers/producto.controller')

app.get('/producto/buscar', ProductoController.BuscarProductos); // GET /producto/buscar?{q=monitores}&{orderby=1}&{page=1}
app.get('/producto/index', ProductoController.GetIndex); // GET /producto/index
app.post('/producto/getall', ProductoController.GetProductos); // POST /producto/getall
app.get('/producto/:id', ProductoController.GetProducto); // GET /producto/{id}
app.post('/producto/pedido', ProductoController.GetProductosPedido); //POST /producto/pedido

module.exports = app;