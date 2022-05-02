import { Component, OnInit } from "@angular/core";
import { Carousel } from "../models/carousel.model";
import { Promocionado } from "../models/promocionado.model";
import { ProductoService } from "../services/producto.service";

@Component({
    selector:'app-inicio',
    templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
    public carousel!: Carousel[];
    public promocionados!: Promocionado[];

    constructor(
        private productoService: ProductoService
    ){
        
    }
    ngOnInit(): void {
        this.getIndex();
    }

    getIndex(){
        this.productoService.getIndex().subscribe((res:any) => {
            this.carousel = res.carousel;
            this.promocionados = this.parseData(res.promocionados);
        }, (err) => {
            console.log(err);
        })
    }

    parseData(data:any){

        data.forEach((d: { nombre_img: string, precio_con_iva: any }) => {
            d.nombre_img = JSON.parse(d.nombre_img); // parse de json a array
            d.precio_con_iva = d.precio_con_iva.toFixed(2); // para decimal
        });

         return data;
    }
    
}