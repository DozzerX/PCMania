
const PedidoRepo = require('../repositories/pedido.repo')
const ProductoRepo = require('../repositories/producto.repo')
const DireccionRepo = require('../repositories/direccion.repo')
const Producto = require('../models/pedido.model')
const Factura = require('../models/factura.model')

const PDFDocument = require('pdfkit');


function CrearPedido(tokenId, body){
    return new Promise((resolve, reject) => {
        if(!tokenId) return reject({ msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException' })

        if(!body.carrito[0].producto_id) return reject({msg:'Se require el ID del Producto a comprar', type:'BadRequestException'})

        if(!body.carrito[0].cantidad) return reject({msg:'Se requiere una CANTIDAD del producto a comprar', type:'BadRequestException'})

        if(!body.direccion) return reject({msg:'Se requiere la dirección ID', type:'BadRequestException'})
        
        const carrito = body.carrito;
        var pedido = new Producto();
        pedido.gastos_envio = 3.99 * carrito.length;
        pedido.total_dinero = 3.99 * carrito.length;
        pedido.fk_usuario_id = tokenId;
        var numero_articulos = 0;
        pedido.productos_comprados = JSON.stringify(pedido.CrearProductosComprados(carrito));

        ProductoRepo.GetProductos(carrito)
            .then((productos) => {

                productos.forEach(producto => {
                    carrito.forEach(carr => {
                        if(producto.producto_id === carr.producto_id){
                            if(producto.disponibles >= carr.cantidad){
                                producto.disponibles += - carr.cantidad;
                                pedido.total_dinero += producto.precio_con_iva * carr.cantidad;
                                numero_articulos += carr.cantidad;
                            } else {
                                return reject({msg:'No quedan unidades disponibles de este producto'});
                            }
                        }
                    })
                });

                PedidoRepo.CrearPedido(pedido)
                    .then((pedido_id) => {
                        ProductoRepo.ActualizarDisponibles(productos)
                            .then(() => {
                                PedidoRepo.GetPedido(tokenId, pedido_id)
                                    .then((pedido_creado) => {
                                        DireccionRepo.ReadById(tokenId, body.direccion)
                                            .then((direccion) => {

                                                var nueva_factura = new Factura();
                                                    nueva_factura.fecha = pedido_creado.fecha;
                                                    nueva_factura.nombre = direccion.nombre;
                                                    nueva_factura.apellidos = direccion.apellidos;
                                                    nueva_factura.direccion = direccion.direccion;
                                                    nueva_factura.poblacion = direccion.poblacion;
                                                    nueva_factura.nif = direccion.dni;
                                                    nueva_factura.cp = direccion.cp;
                                                    nueva_factura.telefono = direccion.telefono;
                                                    nueva_factura.articulos = numero_articulos;
                                                    nueva_factura.metodo_pago = pedido_creado.metodo_pago;
                                                    nueva_factura.gastos_envio = pedido_creado.gastos_envio;
                                                    nueva_factura.subtotal = "";
                                                    nueva_factura.iva = 0.21;
                                                    nueva_factura.total = pedido_creado.total_dinero;
                                                    nueva_factura.fk_pedido_id = pedido_creado.pedido_id;

                                                nueva_factura.subtotal = nueva_factura.CrearSubtotal(productos, carrito);
                                                nueva_factura.subtotal += 3.99 * carrito.length;

                                                PedidoRepo.CrearFactura(nueva_factura)
                                                    .then(() => {
                                                        var resultadoPedido = {};
                                                        resultadoPedido.pedido_id = pedido_id;
                                                        resultadoPedido.listo = true;
                                                        return resolve(resultadoPedido);
                                                    })
                                                    .catch(err => {
                                                        return reject(err);
                                                    })
                                            })
                                            .catch(err => {
                                                return reject(err);
                                            })
                                    })
                                    .catch(err => {
                                        return reject(err);
                                    })
                            })
                            .catch(err => {
                                return reject(err);
                            })
                    })
                    .catch(err => {
                        return reject(err);
                    })
            })
            .catch(err => {
                return reject(err);
            })
        
    })
    
}

function GetAll(tokenId){
    return new Promise((resolve, reject) => {
        if(!tokenId) return reject({ msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException' })

        PedidoRepo.GetPedidos(tokenId)
            .then((pedidos) => {
                return resolve(pedidos);
            })
            .catch(err => {
                return reject(err);
            })
    })
}

function ReadById(tokenId, pedido_id){
    return new Promise((resolve, reject) => {
        if(!tokenId) return reject({ msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException' })

        if(!pedido_id) return reject({msg:'Se requiere el ID del pedido', type:'BadRequestException'})
    
        PedidoRepo.GetPedido(tokenId, pedido_id)
            .then((pedido) => {
                return resolve(pedido);
            })
            .catch(err => {
                return reject(err);
            })
    })
    
}

function GetFactura(tokenId, pedido_id, res){
    return new Promise((resolve, reject) => {
        if(!tokenId) return reject({ msg:'Se requiere el ID del autor de la llamada', type:'UnauthorizedException' })

        if(!pedido_id) return reject({msg:'Se requiere el ID del pedido', type:'BadRequestException'})

        PedidoRepo.GetPedido(tokenId, pedido_id)
            .then((pedido) => {
                var productos_comprados = JSON.parse(pedido.productos_comprados);
                var productosList = []; 

                for(let key in productos_comprados){
                    var prodObj = {};
                    prodObj.producto_id = key;
                    productosList.push(prodObj);
                }
                
                ProductoRepo.GetProductos(productosList)
                    .then((productos) => {

                        for(let key in productos_comprados){
                            productos.forEach(element => {
                                if(key == element.producto_id){
                                    element.cantidad = productos_comprados[key]
                                }
                            })
                        }

                        PedidoRepo.GetFactura(pedido_id)
                            .then((factura) => {
                                const doc = new PDFDocument({font: 'Times-Roman', autoFirstPage: false});
                                doc.addPage({margin: 25});

                                // Titulo
                                doc.fontSize(25).font('Times-Bold').text("PCMANIA")
                                    .font('Times-Roman').fontSize(15).text("Factura", 25 , 65); 
                                // Información para el cliente
                                doc.fontSize(10).font('Times-Bold')
                                    .text("Servicio de atención al cliente",400,30 ).moveDown(0.1)
                                    .font('Times-Roman').text("L-V 9:00-21:00; Sáb. 10:00-17:00").moveDown(0.1)
                                    .text("965 44 84 49").moveDown(0.1)
                                    .text("info@pcmania.es").moveDown(0.1)
                                    .text("www.pcmania.es")
                                    
                                doc.text("PCMANIA, S.L.", 400, 135).moveDown(0.1)
                                    .text("NIF: B54550090").moveDown(0.1)
                                    .text("C/ Gabriel Miro, 1").moveDown(0.1)
                                    .text("03207, Elche, Alicante")

                                // Información del cliente
                                doc.font('Times-Bold').text("Dirección de envío", 25 ,130).moveDown(0.1)
                                    .font('Times-Roman').text(factura.nombre + " " + factura.apellidos).moveDown(0.1)
                                    .text(factura.direccion).moveDown(0.1)
                                    .text(factura.cp + " " + factura.poblacion).moveDown(0.1)
                                    .text(factura.telefono)
                                // Table Header
                                doc.lineWidth(25);
                                doc.lineCap('ID').moveTo(25, 230).lineTo(60, 230)
                                    .strokeColor("#A8A8A8", 0.7).fillAndStroke("#A8A8A8","#A8A8A8");
                                doc.lineCap("Producto").moveTo(65, 230).lineTo(380, 230)
                                    .strokeColor("#A8A8A8", 0.7).fillAndStroke("#A8A8A8","#A8A8A8");
                                doc.lineCap("Precio").moveTo(385, 230).lineTo(435, 230)
                                    .strokeColor("#A8A8A8", 0.7).fillAndStroke("#A8A8A8","#A8A8A8");
                                doc.lineCap("Cantidad").moveTo(440, 230).lineTo(490, 230)
                                    .strokeColor("#A8A8A8", 0.7).fillAndStroke("#A8A8A8","#A8A8A8");
                                doc.lineCap("Total").moveTo(495, 230).lineTo(545, 230)
                                    .strokeColor("#A8A8A8", 0.7).fillAndStroke("#A8A8A8","#A8A8A8");

                                // Text Table Header
                                doc.strokeColor("black", 1).fillAndStroke("black","black");
                                doc.fontSize(11).text("ID",37, 225)
                                                .text("Nombre de producto",75, 225)
                                                .text("Precio", 395, 225)
                                                .text("Cantidad",445, 225)
                                                .text("Total", 507, 225)
                                // Main content
                                doc.y = 250;
                                productos.forEach(producto => {
                                    // si es el nombre del producto es mas largo que 64 caracteristicas crear una columna
                                    if(producto.nombre_producto.length<64){
                                        var precioTotal = producto.precio_con_iva*producto.cantidad;
                                        doc.fontSize(10).text(producto.producto_id, 37, doc.y).moveUp()
                                                        .text(producto.nombre_producto, 75, doc.y).moveUp()
                                                        .text(producto.precio_con_iva, 395, doc.y).moveUp()
                                                        .text(producto.cantidad, 445, doc.y).moveUp()
                                                        .text(Math.round((precioTotal + Number.EPSILON) * 100 ) / 100, 507, doc.y)
                                    } else {
                                        var precioTotal = producto.precio_con_iva*producto.cantidad;
                                        doc.fontSize(10).text(producto.producto_id, 37, doc.y).moveUp()
                                                        .text(producto.nombre_producto, 75, doc.y, {
                                                                columns: 1, width: 300}).moveUp().moveUp()
                                                        .text(producto.precio_con_iva, 395, doc.y).moveUp()
                                                        .text(producto.cantidad, 445, doc.y).moveUp()
                                                        .text(Math.round((precioTotal + Number.EPSILON) * 100 ) / 100, 507, doc.y).moveDown()
                                    }
                                    
                                });

                                doc.fontSize(10).text("-", 37, doc.y).moveUp()
                                                .text("Envio", 75, doc.y).moveUp()
                                                .text("3.99", 395, doc.y).moveUp()
                                                .text(Math.round(((pedido.gastos_envio/3.99) + Number.EPSILON) * 100) / 100, 445, doc.y).moveUp()
                                                .text(pedido.gastos_envio, 507, doc.y)

                                
                                // Total
                                doc.moveDown(3)
                                doc.lineCap("subtotal").moveTo(240, doc.y).lineTo(340, doc.y)
                                    .strokeColor("#A8A8A8", 0.7).fillAndStroke("#A8A8A8","#A8A8A8");
                                doc.lineCap("iva").moveTo(345, doc.y).lineTo(445, doc.y)
                                    .strokeColor("#A8A8A8", 0.7).fillAndStroke("#A8A8A8","#A8A8A8");
                                doc.lineCap("total2").moveTo(450, doc.y).lineTo(545, doc.y)
                                    .strokeColor("#A8A8A8", 0.7).fillAndStroke("#A8A8A8","#A8A8A8");
                                
                                doc.strokeColor("black", 1).fillAndStroke("black","black");
                                doc.fontSize(11).text("SUBTOTAL", 262, doc.y - 4)
                                                .text("IVA (21%)", 372, doc.y- 12)
                                                .text("TOTAL", 480, doc.y- 12).moveDown()
                                let subtotal = pedido.total_dinero/1.21;
                                doc.text(Math.round((subtotal + Number.EPSILON) * 100) / 100 + " €", 240, doc.y, {
                                    columns:1, width: 100, align: "center"}).moveUp()
                                    .text(Math.round(((pedido.total_dinero - subtotal)+ Number.EPSILON)*100)/100 + " €", 345, doc.y, {
                                        columns:1 , width: 100, align: "center"}).moveUp()
                                    .text(pedido.total_dinero + " €", 450, doc.y, {
                                        columns: 1, width:95, align:"center"})
                                    

                                // var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in...';

                                // doc.y = 320;
                                // doc.fillColor('black')
                                // doc.text(loremIpsum, {
                                //     paragraphGap: 10,
                                //     indent: 20,
                                //     align: 'justify',
                                //     columns: 2
                                // }); 

                                doc.text('1/1', doc.page.width - 40, doc.page.height - 30, {
                                    lineBreak: false
                                  });

                                doc.end();
                                return resolve(doc.pipe(res));

                            })
                            .catch(err => {
                                return reject(err);
                            })
                    })
                    .catch(err => {
                        return reject(err);
                    })
                
            })
            .catch(err => {
                return reject(err);
            })
    })
}

module.exports = {
    CrearPedido,
    GetAll,
    ReadById,
    GetFactura
}