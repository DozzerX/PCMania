import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { URL_LOCAL } from "../config/config";


@Injectable({
    providedIn: 'root'
})
export class ProductoService {

    updateCarritoNavbar = new Subject();

    constructor( public http: HttpClient) {}

    getProducto(producto_id:number){
        const url = URL_LOCAL + "/producto/" + producto_id;

        return this.http.get(url);
    }

    getProductos(productos: any){
        const url = URL_LOCAL + "/producto/getall";

        return this.http.post(url, productos);
    }

    getIndex(){
        const url = URL_LOCAL + "/producto/index";

        return this.http.get(url);

    }

    getProductosPedido(listaIds:any){
        const url = URL_LOCAL + "/producto/pedido";

        return this.http.post(url, listaIds);
    }

    getBuscarProductos(query:any, orderby:number, page:number, numPerPages:number){
        const url = URL_LOCAL + "/producto/buscar?q=" + query + "&orderby=" + orderby + "&page=" + page + "&numPerPages=" + numPerPages;

        return this.http.get(url)
    }

    comprobarCarrito(){
        return ( localStorage.getItem('pcmania_carrito') ) ? true : false;
    }
}