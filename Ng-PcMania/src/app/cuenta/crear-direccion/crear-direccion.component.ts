import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DireccionService } from "src/app/services/direccion.service";
import { Direccion } from "src/app/models/direccion.model";

@Component({
    selector: "app-cuenta",
    templateUrl: "./crear-direccion.component.html"
})
export class CrearDireccionComponent {
    
    public direccion = {} as Direccion

    direccionFB = this.fb.group({
        nombre:["",[Validators.required, Validators.pattern('[a-zA-Z\s]+')]],
        apellidos:["", Validators.required],
        email:["", [Validators.required, Validators.email]],
        dni:["", [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        fecha_nacimiento:["", Validators.required],
        telefono:["",[Validators.required, Validators.pattern('[0-9]{9}')]],
        direccion:["", Validators.required],
        cp:["", [Validators.required, Validators.pattern('[0-9]{5}')]],
        poblacion:["", Validators.required],
        provincia:["", Validators.required]
    })

    constructor(
        private direccionService: DireccionService,
        private fb: FormBuilder,
        private router: Router
    ){}


    CrearDireccion(){
        this.direccion = this.direccionFB.value;
        this.direccionService.crearDireccion(this.direccion).subscribe((res:any) => {
            this.router.navigate(['/cuenta/direcciones']);
        }, (err) => {
            console.error(err);
        })
    }

}