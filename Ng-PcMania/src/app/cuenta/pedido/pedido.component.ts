import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Carrito } from "src/app/models/carrito.model";
import { Pedido } from "src/app/models/pedido.model";
import { Producto } from "src/app/models/producto.model";
import { PedidoService } from "src/app/services/pedido.service";
import { ProductoService } from "src/app/services/producto.service";

@Component({
    selector: 'app-cuenta',
    templateUrl: './pedido.component.html'
})
export class PedidoComponent implements OnInit{
    public param_id?:number;
    public pedido = {} as Pedido;
    public productosList: Producto[] = []    
    public carritoList: Carrito[] = [];
    public listProductos_ID:any[] = []
    
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private pedidoService: PedidoService,
        private productoService: ProductoService
    ){}

    ngOnInit(): void {
        this.getPedido();
    }

    getPedido(){
        this.route.params.subscribe(params => {
            this.param_id = Number(params['id']);

            this.pedidoService.getPedido(this.param_id).subscribe((res:any) => {
                this.pedido = this.parseData(res);
                this.getProductos();
            }, (err) => {
                console.error(err);
            })

        })
    }

    parseData(data:any) {
        var productosComprados:{[key: number]: number};
        productosComprados = JSON.parse(data.productos_comprados)
        data.numero_articulos = 0;
        
        for(let key in productosComprados) {
            data.numero_articulos += Number(productosComprados[key])
            
            this.listProductos_ID.push(key);

            var newCarrito = {} as Carrito;
            newCarrito.cantidad = Number(productosComprados[key]);
            newCarrito.producto_id = Number(key);
            this.carritoList.push(newCarrito);
        }
        return data;
    }

    getProductos() {
        this.productoService.getProductosPedido(this.listProductos_ID).subscribe((res:any) => {
            this.productosList = this.parseDataProductos(res);
        }, (err) => {
            console.error(err);
        })
    }

    parseDataProductos(data:any){

        data.forEach((element:any) => {
            element.nombre_img = JSON.parse(element.nombre_img)
            element.precio_con_iva = element.precio_con_iva.toFixed(2);
        })

        return data;
    }

    getFacturaPdf(){
        this.pedidoService.getFacturaPdf(this.pedido.pedido_id).subscribe((res:any) => {
            this.descargarPdf(res);
        }, (err) => {
            console.error(err);
        })
    }

    descargarPdf(data:any){
        let blob = new Blob([data], {type: 'application/pdf'});
        let url = window.URL.createObjectURL(blob);
        window.open(url);
    }
    
}