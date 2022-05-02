
function CrearPedido(pedido){
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO pedidos SET ?', [pedido], (err, result) => {
            if(err) return reject(err);
    
            if(result.affectedRows == 0) return reject({ msg:'No se pudo crear el pedido', type:'DataLayerException' })
            else return resolve(result.insertId);
        })
    })
}

function GetPedido(usuario_id, pedido_id){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM pedidos WHERE pedido_id = ? AND fk_usuario_id = ?', [pedido_id, usuario_id], (err, rows) => {
            if(err) return reject(err);

            if (rows.length == 0) return reject({ msg:'No existen pedidos con este ID', type:'NotFoundException' })

            if (rows.length == 1) return resolve(rows[0])
            else return reject({ msg:'Existe más de un pedido con este ID', type:'DataLayerException' })
        })
    })
}

function GetPedidos(usuario_id){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM pedidos WHERE fk_usuario_id = ?', [usuario_id], (err, rows) => {
            if(err) return reject(err);

            return resolve(rows);
        })
    })
}

function CrearFactura(factura){
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO facturas SET ?', [factura], (err, result) => {
            if(err) return reject(err);

            if(result.affectedRows == 0) return reject({ msg:'No se pudo crear la factura', type:'DataLayerException' })
            return resolve(result.insertId);
        })
    })
}

function GetFactura(fk_pedido_id){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM facturas where fk_pedido_id = ?',[fk_pedido_id], (err, rows) => {
            if(err) return reject(err);
            
            if(rows.length == 0) return reject({msg:'No existe una factura relacionada con este PedidoID', type:'DataLayerException'})
            
            return resolve(rows[0]);
        })
    })
}

module.exports = {
    CrearPedido,
    GetPedido,
    GetPedidos,
    CrearFactura,
    GetFactura
    
}