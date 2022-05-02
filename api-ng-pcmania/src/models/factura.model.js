class Factura {
    constructor(fecha, nombre, apellidos, direccion, poblacion, nif, cp, telefono, articulos, metodo_pago, gastos_envio, subtotal, iva, total, fk_pedido_id){
        this.factura_id;
        this.fecha = fecha;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.poblacion = poblacion;
        this.nif = nif;
        this.cp = cp;
        this.telefono = telefono;
        this.articulos = articulos;
        this.metodo_pago = metodo_pago;
        this.gastos_envio = gastos_envio;
        this.subtotal = subtotal;
        this.iva = iva;
        this.total = total;
        this.fk_pedido_id = fk_pedido_id;
    }

    CrearSubtotal(productos , carrito){
        let subtotal = 0;
        productos.forEach((producto) => {
            carrito.forEach((carr) => {
                if(producto.producto_id == carr.producto_id){
                    subtotal += producto.precio * carr.cantidad
                }
            })
        })
        return subtotal
    }
}

module.exports = Factura;