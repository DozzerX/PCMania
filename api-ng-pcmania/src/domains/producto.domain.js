const ProductoRepo = require('../repositories/producto.repo');


function GetProducto(producto_id) {
    return new Promise((resolve, reject) => {
        ProductoRepo.GetProducto(producto_id)
            .then((producto) => {
                ProductoRepo.GetPromocionados()
                    .then((promocionados) => {

                        producto.promocionados = promocionados
                        return resolve(producto)
                    })
                    .catch(err =>{
                        return reject(err);
                    })
            })
            .catch(err =>{
                return reject(err);
            })
    })
}

function GetProductos(body){
    return new Promise((resolve, reject) => {

        if(!body[0].producto_id) return reject({msg:'Se requiere el ID del producto', type:'BadRequestException'})

        if(!body[0].cantidad) return reject({msg:'Se requiere una cantidad del producto', type:'BadRequestException'})

        ProductoRepo.GetProductos(body)
            .then((productos) => {
                return resolve(productos)
            })
            .catch(err =>{
                return reject(err);
            })
    })
}

function GetIndex(){
    return new Promise((resolve, reject) => {
        ProductoRepo.GetCarousel()
            .then((carousel) => {
                ProductoRepo.GetPromocionados()
                    .then((promocionados) => {
                        var index = {};
                        index.carousel = carousel;
                        index.promocionados = promocionados;
                        return resolve(index);
                    })
                    .catch(err =>{
                        return reject(err);
                    })
            })
            .catch(err =>{
                return reject(err);
            })
    })
}

function GetProductosPedido(body){
    return new Promise((resolve, reject) => {
        if(!body) return reject({msg:'Se requieren los IDs de los productos', type:'BadRequestException'})

        ProductoRepo.GetProductosPedido(body)
            .then((productos) => {
                return resolve(productos);
            })
            .catch(err =>{
                return reject(err);
            })
    })
}

function BuscarProductos(q, orderby, page, numPerPages){
    return new Promise((resolve, reject) => {
        if(!q) return reject({msg:'Se require que la busqueda no este vácia', type:'BadRequestException'})

        if(!orderby) return reject({msg:'Se requiere un ordenar para la busqueda', type:'BadRequestException'})

        if(!page) return reject({msg:'Se requiere una número para el páginado', type:'BadRequestException'})

        if(!numPerPages) return reject({msg:'Se requiere un número para la cantidad de productos por página', type:'BadRequestException'})

        var orderby_defined;
        switch (orderby){
            case "0":
                orderby_defined = 0
                break;
            case '1':
                orderby_defined = 'precio_con_iva ASC';
                break;
            case '2':
                orderby_defined = 'precio_con_iva DESC';
                break;
            case '3':
                orderby_defined = 'nombre_producto ASC'
                break;
            case '4':
                orderby_defined = 'nombre_producto DESC'
                break;
            default:
                orderby_defined = 0
        }

        ProductoRepo.BuscarProductos(q, orderby_defined, page, numPerPages)
            .then((busqueda) => {
                return resolve(busqueda);
            })
            .catch(err =>{
                return reject(err);
            })
    })
}

module.exports = {
    GetProducto,
    GetProductos,
    GetIndex,
    GetProductosPedido,
    BuscarProductos
}