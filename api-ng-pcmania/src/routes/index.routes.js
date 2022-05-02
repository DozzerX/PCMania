const express = require('express')
const app = express()

app.use(require('./auth.routes'))
app.use(require('./usuario.routes'))
app.use(require('./direccion.routes'))
app.use(require('./producto.routes'))
app.use(require('./pedido.routes'))

module.exports = app