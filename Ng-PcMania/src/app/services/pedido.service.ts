import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_LOCAL } from "../config/config";

@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    constructor( private http: HttpClient ){}

    realizarCompra(carrito:any, direccion:any){
        let pedido = {
            carrito : carrito,
            direccion : direccion
        }
        const url = URL_LOCAL + "/pedido/crear";
        const token = this.getToken();
        const headers = new HttpHeaders({'Authorization': "" + token});

        return this.http.post(url, pedido, {headers});
    }

    getPedidos(){
        const url = URL_LOCAL + "/pedido/getall";
        const token = this.getToken();
        const headers = new HttpHeaders({'Authorization': "" + token});

        return this.http.get(url, {headers});
    }

    getPedido(pedido_id:number){
        const url = URL_LOCAL + "/pedido/" + pedido_id;
        const token = this.getToken();
        const headers = new HttpHeaders({'Authorization': "" + token});

        return this.http.get(url, {headers});
    }

    getFacturaPdf(pedido_id:number){
        const url = URL_LOCAL + "/pedido/" + pedido_id + "/factura";
        const token = this.getToken();
        const headers = new HttpHeaders({'Authorization': "" + token});

        return this.http.get(url, {headers, responseType: "arraybuffer"});
    }

    getToken() {
        return localStorage.getItem('pcmaniaToken');
    }
}