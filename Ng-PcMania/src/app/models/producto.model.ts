import { Promocionado } from "./promocionado.model";

export class Producto {
    constructor(
        public producto_id: number,
        public precio: number,
        public precio_con_iva: number | string,
        public disponibles: number,
        public categoria: string,
        public sub_categoria: string,
        public nombre_producto: string,
        public nombre_img: string[],
        public specs?: string,
        public cantidad_comprar?: number,
        public total_precio?: number
    ){}
}