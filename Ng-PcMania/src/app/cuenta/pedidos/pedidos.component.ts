import { Component, OnInit } from "@angular/core";
import { Pedido } from "src/app/models/pedido.model";
import { PedidoService } from "src/app/services/pedido.service";

@Component({
    selector: 'app-cuenta',
    templateUrl: 'pedidos.component.html'
})
export class PedidosComponent implements OnInit {
    public listaPedidos: Pedido[] = [];

    constructor(
        private pedidoService: PedidoService
    ){}

    ngOnInit(): void {
        this.getPedidos();
    }

    getPedidos(){
        this.pedidoService.getPedidos().subscribe((res:any) => {
            this.listaPedidos = this.parseData(res);
        }, (err) => {
            console.error(err);
        })
    }

    parseData(data:any){
        data.forEach((element:any, index:number) => {
            var productosComprados:{[key: number]: number};
            productosComprados = JSON.parse(element.productos_comprados)
            data[index].numero_articulos = 0;

            for(let key in productosComprados) {
                data[index].numero_articulos += Number(productosComprados[key])
            }
        });
        return data;
    }


}