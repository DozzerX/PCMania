import { ViewportScroller } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Producto } from "../models/producto.model";
import { ProductoService } from "../services/producto.service";

@Component({
    selector: 'app-buscar',
    templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {
    private numPerPages = 28;
    public paramObject = {
        q: undefined,
        orderby: 0,
        page: 1
    }
    public totalPages:number = 1;
    public arrayPages:any[] = []
    public listProductos:Producto[] = [];
    public articulos_encontrados = 0;

    public ordenarSeleccionado:any = 0;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productoService: ProductoService,
        private scroll: ViewportScroller
    ){}

    ngOnInit(): void {
        this.recibirParams();
        this.comprobarPaginadoMaximo();
    }

    scrollToTop(){
        this.scroll.scrollToPosition([0,0]);
    }
    
    recibirParams(){
        this.route.queryParams.subscribe((params:any)=> {
            if(params.page) this.paramObject.page = params.page;
            if(params.orderby) this.paramObject.orderby = params.orderby;

            if(this.paramObject.orderby >= 0 && this.paramObject.orderby <= 4){
                this.ordenarSeleccionado = this.paramObject.orderby; 
            }

            if(params.q){
                this.paramObject.q = params.q
                this.buscarProductos();
            }
        })
    }

    buscarProductos(){
        this.productoService.getBuscarProductos(this.paramObject.q, this.ordenarSeleccionado, this.paramObject.page, this.numPerPages).subscribe((res:any) => {
            this.totalPages = res.totalPages;
            this.articulos_encontrados = res.articulos_encontrados;
            this.listProductos = this.parseData(res.productos);
            this.crearArrPaginado();
        }, (err) => {
            console.error(err);
        })
    }

    parseData(data:any){
        data.forEach((element:any) => {
            element.nombre_img = JSON.parse(element.nombre_img)
            element.precio_con_iva = element.precio_con_iva.toFixed(2);
        })
        return data;
    }

    crearArrPaginado(){
        this.arrayPages = new Array(this.totalPages)
    }

    capturarOrdenar(){
        this.router.navigate(['/buscar'], {queryParams: {q: this.paramObject.q, orderby: this.ordenarSeleccionado, page: this.paramObject.page}})
    }
    
    comprobarPaginadoMaximo(){
        if(this.totalPages < this.paramObject.page){
            this.router.navigate(['/buscar'], {queryParams: {q: this.paramObject.q, orderby: this.ordenarSeleccionado, page: 1}})

        }
    }

    seleccionarPagina(numb:any){
        var number:number = Number(numb);
        if(number != Number(this.paramObject.page)) {
            this.router.navigate(['/buscar'], {queryParams: {q: this.paramObject.q, orderby: this.ordenarSeleccionado, page: number}});
            this.scrollToTop();
        }
    }

    siguientePagina(numb:any){

        var number:number = Number(numb);

        if(number == 1){
            if(Number(this.paramObject.page) < this.totalPages){
                this.router.navigate(['/buscar'], {queryParams: {q: this.paramObject.q, orderby: this.ordenarSeleccionado, page: Number(this.paramObject.page) + number}});
                this.scrollToTop();
            }
        }

        if(number == -1){
            if(Number(this.paramObject.page) > 1){
                this.router.navigate(['/buscar'], {queryParams: {q: this.paramObject.q, orderby: this.ordenarSeleccionado, page: Number(this.paramObject.page) + number}});
                this.scrollToTop();
            }
        }
    }
    
}