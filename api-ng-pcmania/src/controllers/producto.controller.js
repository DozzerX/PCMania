const ProductoDomain = require('../domains/producto.domain');
const errors = require('../utils/errors.util');

function GetProducto(req, res) {
    ProductoDomain.GetProducto(req.params.id)
        .then((producto) => {
            return res.status(200).json(producto)
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function GetProductos(req, res){
    ProductoDomain.GetProductos(req.body)
        .then((productos) =>{
            return res.status(200).json(productos)
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function GetIndex(req, res){
    ProductoDomain.GetIndex()
        .then((index) => {
            return res.status(200).json(index);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function GetProductosPedido(req, res){
    ProductoDomain.GetProductosPedido(req.body)
        .then((productos) => {
            return res.status(200).json(productos);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}

function BuscarProductos(req, res){
    ProductoDomain.BuscarProductos(req.query.q, req.query.orderby, req.query.page, req.query.numPerPages)
        .then((productos) => {
            return res.status(200).json(productos);
        })
        .catch((err) => {
            errors.checkErrorType(err, res);
        })
}


module.exports = {
    GetProducto,
    GetProductos,
    GetIndex,
    GetProductosPedido,
    BuscarProductos
}