import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Carrito } from "../models/carrito.model";
import { Direccion } from "../models/direccion.model";
import { Producto } from "../models/producto.model";
import { DireccionService } from "../services/direccion.service";
import { PedidoService } from "../services/pedido.service";
import { ProductoService } from "../services/producto.service";
import { UsuarioService } from "../services/usuario.service";

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {
    public productoList: Producto[] = [];
    public carritoList: Carrito[] = [];
    public direccionList: Direccion[] = [];
    public isLogged:boolean = false;

    public subtotal: string = "0.00";
    public total:string = "0.00";

    public direccionSeleccionada:any = 0;
    public btnComprar:boolean = true;

    constructor(
        private productoService: ProductoService,
        private usuarioService: UsuarioService,
        private direccionService: DireccionService,
        private pedidoService: PedidoService,
        private router: Router
    ){}

    ngOnInit(): void {
        if(this.comprobarCarrito()){
            this.getProductos();
        }

        if(this.usuarioService.isLoggedIn()){
            this.isLogged = true;
            this.getDirecciones();
        }
    }

    getProductos(){
        let storage_carrito = localStorage.getItem('pcmania_carrito')!;
        let old_carrito: Carrito[] = JSON.parse(storage_carrito);

        this.productoService.getProductos(old_carrito).subscribe((res:any) => {
            this.productoList = this.parseData(res);
            this.actualizarPrecio();
        }, (err) => {
            console.error(err);
        })
    }

    parseData(data:any){
        let storage_carrito = localStorage.getItem('pcmania_carrito')!;
        let old_carrito: Carrito[] = JSON.parse(storage_carrito);
        data.forEach((element:any) => {
            element.nombre_img = JSON.parse(element.nombre_img)
            element.precio_con_iva = element.precio_con_iva.toFixed(2);
            
            let carrito = old_carrito.find(elem => elem.producto_id === element.producto_id)
            element.cantidad_comprar = carrito!.cantidad;
            element.total_precio = carrito!.cantidad * element.precio_con_iva
            element.total_precio = element.total_precio.toFixed(2);
        })

        return data
    }

    getDirecciones(){
        this.direccionService.getDirecciones().subscribe((res:any) => {
            this.direccionList = res;
        }, (err) => {
            console.error(err);
        })
    }

    eliminarProducto(id:number){
        let storage_carrito = localStorage.getItem('pcmania_carrito')!;
        let old_carrito: Carrito[] = JSON.parse(storage_carrito);
        
        old_carrito.forEach((element, index) => {
            if(element.producto_id === id) {
                old_carrito.splice(index,1);
            }
        })
        if(old_carrito.length === 0){
            localStorage.removeItem('pcmania_carrito');
        } else {
            let json_carrito = JSON.stringify(old_carrito);
            localStorage.setItem('pcmania_carrito', json_carrito);
        }
        this.actualizarPrecio();
        this.updateCarritoNavbar();
    }

    masUno(id:number){
        this.productoList.forEach((element:any) => {
            if(element.producto_id === id && element.cantidad_comprar!=10 ){
                element.cantidad_comprar += 1;
                element.total_precio = element.cantidad_comprar * element.precio_con_iva;
                element.total_precio = element.total_precio.toFixed(2);
                this.actualizarCarrito(id, 1);
                this.actualizarPrecio();
                this.updateCarritoNavbar();
            }
        })
    }

    menosUno(id:number){
        this.productoList.forEach((element:any) => {
            if(element.producto_id === id && element.cantidad_comprar!=1 ){
                element.cantidad_comprar += -1;
                element.total_precio = element.cantidad_comprar * element.precio_con_iva;
                element.total_precio = element.total_precio.toFixed(2);
                this.actualizarCarrito(id,-1);
                this.actualizarPrecio();
                this.updateCarritoNavbar();
            }
        })
    }

    actualizarCarrito(prod_id:number, sumarOrestar:number){
        let storage_carrito = localStorage.getItem('pcmania_carrito')!;
        let old_carrito: Carrito[] = JSON.parse(storage_carrito);
        
        old_carrito.forEach((element:any) => {
            if(element.producto_id === prod_id) element.cantidad += sumarOrestar
        })
        let json_carrito = JSON.stringify(old_carrito);
        localStorage.setItem('pcmania_carrito', json_carrito);
    }

    actualizarPrecio(){
        let subtotal = 0;
        let total = 0;
        if(this.productoList.length!=0){
            this.productoList.forEach((element:any) => {
                subtotal += element.precio_con_iva * element.cantidad_comprar;
            })
            total= subtotal + (this.productoList.length * 3.99);
            this.subtotal = subtotal.toFixed(2);
            this.total = total.toFixed(2);
        }
        
    }

    capturarDireccion(){
        if(this.comprobarCarrito()){
            if(this.direccionSeleccionada != 0){ this.btnComprar = false; }
            else { this.btnComprar = true }
        }
    }

    realizarCompra(){
        let storage_carrito = localStorage.getItem('pcmania_carrito')!;
        let old_carrito: Carrito[] = JSON.parse(storage_carrito);

        this.pedidoService.realizarCompra(old_carrito, this.direccionSeleccionada).subscribe((res:any) => {
            console.log(res);
            if(res.listo === true){
                localStorage.removeItem('pcmania_carrito');
                this.router.navigate(['/cuenta/pedido/', res.pedido_id])
            }
        }, (err) => {
            console.error(err);
        })
    }

    updateCarritoNavbar(){
        this.productoService.updateCarritoNavbar.next("");
    }

    comprobarCarrito(){
        return ( localStorage.getItem('pcmania_carrito') ) ? true : false;
    }
}