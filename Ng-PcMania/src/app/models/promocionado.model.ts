export class Promocionado {
    constructor(
        public producto_id: number,
        public nombre_img: string[],
        public nombre_producto: string,
        public precio_con_iva: number,
        public tipo_promocion: string
    ) {}
}