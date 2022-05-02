export class Pedido {
    constructor(
        public pedido_id: number,
        public fecha: Date,
        public total_dinero: number,
        public productos_comprados:string,
        public gastos_envio: number,
        public metodo_pago: string,
        public fk_usuario_id: number,
        public numero_articulos?: number
    ){}
}