import { ViewportScroller } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Carrito } from "../models/carrito.model";
import { Producto } from "../models/producto.model";
import { Promocionado } from "../models/promocionado.model";
import { ProductoService } from "../services/producto.service";

@Component({
    selector: 'app-producto',
    templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {
    public param_id!:number;
    public producto!: Producto;
    public destacados: Promocionado[] = [];
    
    public specs!:{[key: string]: string};
    
    public isLoaded:boolean = false;
    public btnDisabled:boolean = true;

    //carrito
    public cantidadCarrito = new FormControl(1);
    // al regargar mover ariba - no es necesario
    // pageYoffset = 0;
    // @HostListener('window:scroll', ['$event']) onScroll(event:any){
    //     this.pageYoffset = window.pageYOffset;
    // }

    constructor(
        private productoService: ProductoService,
        private route: ActivatedRoute,
        private router: Router,
        private scroll: ViewportScroller
    ) {}
    
    ngOnInit(): void {
        this.getProducto();
    }

    recargar(){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        // this.router.navigate(['/producto/'],{relativeTo: this.route, queryParamsHandling: 'preserve'})
        this.scrollToTop();
    }

    scrollToTop(){
        this.scroll.scrollToPosition([0,0]);
    }

    getProducto(){
        this.route.params.subscribe(params => {
            this.param_id = Number(params['id']);

            this.recargar(); // para recargar al navegar misma ruta

            this.productoService.getProducto(this.param_id).subscribe((res:any) => {
                this.producto = this.parseData(res);
                this.isLoaded = true;
                if(this.producto.disponibles != 0) { this.btnDisabled = false}
            }, (err) => {
                console.error(err);
            })
        })
    }

    parseData(data:any) {
        data.nombre_img = JSON.parse(data.nombre_img);
        data.specs = JSON.parse(data.specs);
        this.specs = data.specs;
        data.precio_con_iva = data.precio_con_iva.toFixed(2);
        // lista destacados
        if(this.destacados.length === 0){
            data.promocionados.forEach((elem: any) => {
                if(elem.tipo_promocion == "destacados"){
                    elem.nombre_img = JSON.parse(elem.nombre_img);
                    elem.precio_con_iva = elem.precio_con_iva.toFixed(2);
                    this.destacados.push(elem);
                }
            });
        }
        

        delete data.promocionados;
        return data;
    }

    setCarrito(){
        if(this.comprobarCarrito())
            this.updateCarrito();
        else 
            this.createCarrito();
    }

    updateCarrito(){
        let exist: boolean = false;
        let carritoList: Carrito[] = [];
        let storage_carrito = localStorage.getItem('pcmania_carrito')!;
        let old_carrito: Carrito[] = JSON.parse(storage_carrito);
        
        old_carrito.forEach((element:Carrito)=> {
            if(element.cantidad === 10){}
            else {
                if(element.producto_id === this.producto.producto_id){
                    element.cantidad += this.cantidadCarrito.value;
                    carritoList.push(element);
                    exist = true;
                } else {
                    carritoList.push(element);
                }
            }
            
        })

        if(!exist){
            let new_carrito: Carrito = {
                producto_id: this.producto.producto_id,
                cantidad: this.cantidadCarrito.value
            }
            carritoList.push(new_carrito);
        }
        
        let json_carrito = JSON.stringify(carritoList);
        localStorage.setItem('pcmania_carrito', json_carrito);
        this.updateCarritoNavbar();
        this.router.navigate(['/carrito']);
    }

    createCarrito(){
        let carritoList: Carrito[] = [];
        let new_carrito:Carrito = {
            producto_id: this.producto.producto_id,
            cantidad: this.cantidadCarrito.value
        }
        carritoList.push(new_carrito);

        let json_carrito = JSON.stringify(carritoList);
        localStorage.setItem('pcmania_carrito', json_carrito);
        this.updateCarritoNavbar();
        this.router.navigate(['/carrito']);
    }

    comprobarCarrito(){
        return ( localStorage.getItem('pcmania_carrito') ) ? true : false;
    }

    masUno(){   
        if(this.cantidadCarrito.value != 10) {
            let cantidad = this.cantidadCarrito.value;
            cantidad ++;
            this.cantidadCarrito.patchValue(cantidad);
        }
    }
    menosUno(){
        if(this.cantidadCarrito.value != 1){
            let cantidad = this.cantidadCarrito.value;
            cantidad --;
            this.cantidadCarrito.patchValue(cantidad);
        }
    }

    updateCarritoNavbar(){
        this.productoService.updateCarritoNavbar.next(true);
    }
}