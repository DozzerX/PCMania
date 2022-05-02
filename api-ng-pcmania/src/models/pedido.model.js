class Pedido {
    constructor(fecha, total_dinero, productos_comprados, gastos_envio, metodo_pago, fk_usuario_id) {
        this.pedido_id;
        this.fecha = fecha || new Date();
        this.total_dinero = total_dinero;
        this.productos_comprados = productos_comprados;
        this.gastos_envio = gastos_envio;
        this.metodo_pago = metodo_pago || "tarjeta de debito";
        this.fk_usuario_id = fk_usuario_id;
    }

    CrearProductosComprados(carrito){
        var productosComprados = {};
        var productoComprado = {};
        
        carrito.forEach((element) => {
            productoComprado[element.producto_id] = element.cantidad;


            productosComprados = Object.assign({}, productoComprado)
        })
        return productoComprado;
    }
}

module.exports = Pedido;