import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Direccion } from "src/app/models/direccion.model";
import { DireccionService } from "src/app/services/direccion.service";

@Component({
    selector:'app-cuenta',
    templateUrl: './direccion.component.html'
})
export class DireccionComponent {
    public param_id?:number;
    public direccion = {} as Direccion


    constructor(
        private direccionService: DireccionService,
        private router: Router,
        private route: ActivatedRoute

    ){
        this.getDireccion();
    }

    getDireccion() {
        this.route.params.subscribe(params => {
            this.param_id = Number(params['id']);

            this.direccionService.getDireccion(this.param_id).subscribe((res:any) => {
                this.direccion = res;
            }, (err) => {
                console.error(err);
            })
        })
    }

    borrarDireccion() {
        if(confirm("Esta seguro de querer borrar esta dirección?")){
            this.direccionService.borrarDireccion(this.param_id!).subscribe((res:any) => {
                if(res.msg == true) {
                    this.router.navigate(['/cuenta/direcciones'])
                }
            }, (err) => {
                console.error(err);
            })
        }
        
    }

}