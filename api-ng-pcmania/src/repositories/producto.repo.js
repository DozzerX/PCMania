const async = require('async')

function GetProducto(producto_id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM productos where producto_id = ?', [producto_id], (err, rows) => {
            if(err) return reject(err);

            if(rows.length == 0) return reject({ msg:'No existen productos con este ID', type:'NotFoundException' })

            if(rows.length == 1) return resolve(rows[0]);
            else return reject({msg:'Existe más de un producto con este ID', type:'DataLayerException' })
        })
    })
}

function GetProductos(body){
    return new Promise((resolve, reject) => {
        let listIds = [];

        async.eachSeries(body, function(element, callback) {
            listIds.push(element.producto_id);
            callback(null)
        })
        // body.forEach(element => {
        //     listIds.push(element.producto_id)
        // });
        db.query(`SELECT * FROM productos where producto_id IN (?)`, [listIds], (err, rows) => {
            if(err) return reject(err);

            rows.forEach(element => {
                delete element.specs;
            });
            return resolve(rows);
        })
        
    })
}

function GetProductosPedido(body){
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM productos where producto_id IN (?)`, [body], (err, rows) => {
            if(err) return reject(err);

            rows.forEach(element => {
                delete element.specs;
            });
            return resolve(rows);
        })
    })
}


function GetCarousel(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM carousel', (err, rows) => {
            if(err) return reject(err);

            return resolve(rows)
        })
    })
}

function GetPromocionados(){
    return new Promise((resolve, reject) => {
        db.query(`SELECT p.producto_id, p.precio_con_iva, p.nombre_producto, p.nombre_img, pr.tipo_promocion FROM productos p
        INNER JOIN productos_promocionados pr ON pr.fk_producto_id = p.producto_id;`, (err, rows) => {
            if(err) return reject(err);

            return resolve(rows)
        })
    })
}

function ActualizarDisponibles(productos){
    return new Promise((resolve, reject) => {

        async.eachSeries(productos, function(producto, callback) {
            db.query('UPDATE productos SET disponibles = ? WHERE producto_id = ?', [producto.disponibles, producto.producto_id] , (err, result) => {
                if(err) return reject(err);
                if(result.affectedRows == 0) return reject({msg: 'Error al actualizar el producto', type: 'DataLayerException'});
                callback(null);
            })
        })
        
        return resolve();

    })
}

function BuscarProductos(q, orderby, p_page, p_numPerPage){
    var busqueda = {};
    var totalPages;
    var page = parseInt(p_page) - 1;
    var numPerPage = parseInt(p_numPerPage);
    if(page > 6) page = 0;

    var limitTotal = numPerPage * 7; // 7 is maximum number of pages that you can have in the front end
    var limit = numPerPage;
    var limitStart = page * numPerPage;

    var bscr = "%"+q+"%"
    
    var query;
    var queryNormal = `SELECT producto_id, precio_con_iva, nombre_producto, nombre_img FROM productos
                        WHERE nombre_producto LIKE ? OR categoria LIKE ? OR sub_categoria LIKE ? LIMIT ${limitStart}, ${limit}`;

    var queryOrderBy = `SELECT producto_id, precio_con_iva, nombre_producto, nombre_img FROM productos
    WHERE nombre_producto LIKE ? OR categoria LIKE ? OR sub_categoria LIKE ? ORDER BY ${orderby} LIMIT ${limitStart}, ${limit}`;

    var queryContar =  `SELECT count(*) as articulos_encontrados from productos WHERE nombre_producto LIKE ? 
                        OR categoria LIKE ? OR sub_categoria LIKE ?`;

    if(orderby == 0) query = queryNormal;
    else query = queryOrderBy;

    return new Promise((resolve, reject) => {
        db.query(queryContar, [bscr,bscr,bscr] , (err, rows_c) => {
            if(err) return reject(err);

            if(limitTotal < rows_c[0].articulos_encontrados) totalPages = Math.ceil(limitTotal / numPerPage) // definiendo límite de páginas totales
            else totalPages = Math.ceil(rows_c[0].articulos_encontrados / numPerPage)

            busqueda.totalPages = totalPages;
            busqueda.articulos_encontrados = rows_c[0].articulos_encontrados;

            db.query(query, [bscr,bscr,bscr] , (err, rows) => {
                if(err) return reject(err);
                
                busqueda.productos = rows;
                return resolve(busqueda);

            })
        })
        
    })
}

module.exports = {
    GetProducto,
    GetProductos,
    GetProductosPedido,
    GetCarousel,
    GetPromocionados,
    ActualizarDisponibles,
    BuscarProductos
}