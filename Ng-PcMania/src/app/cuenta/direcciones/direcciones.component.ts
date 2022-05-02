import { Component } from "@angular/core";
import { Direccion } from "src/app/models/direccion.model";
import { DireccionService } from "src/app/services/direccion.service";

@Component({
    selector: 'app-cuenta',
    templateUrl: './direcciones.component.html'
})
export class DireccionesComponent {

    public listDirecciones!: Direccion[];

    constructor(
        private direccionService: DireccionService
    ){
        this.direccionService.getDirecciones().subscribe((res:any) => {

            this.listDirecciones = res;
        }, (err) => {
            console.error(err);
        })
    }


}