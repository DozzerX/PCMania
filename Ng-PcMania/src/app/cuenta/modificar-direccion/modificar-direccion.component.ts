import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Direccion } from "src/app/models/direccion.model";
import { DireccionService } from "src/app/services/direccion.service";
import { NavigationService } from "src/app/services/navigation.service";

@Component({
    selector: 'app-cuenta',
    templateUrl: './modificar-direccion.component.html'
})
export class ModificarDireccionComponent implements OnInit {
    public param_id?:number;
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
        private navigationService: NavigationService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ){}
    ngOnInit(): void {
        this.getDireccion();
        this.updateNavDiv();
    }

    getDireccion() {
        this.route.params.subscribe(params => {
            this.param_id = Number(params['id']);

            this.direccionService.getDireccion(this.param_id).subscribe((res:any) => {
                this.direccion = res;
                this.setDireccionFB();
            }, (err) => {
                console.error(err);
            })
        })
    }

    setDireccionFB() {
        
        this.direccionFB.setValue({
            nombre: this.direccion.nombre,
            apellidos: this.direccion.apellidos,
            email: this.direccion.email,
            dni: this.direccion.dni,
            fecha_nacimiento: this.direccion.fecha_nacimiento,
            telefono: this.direccion.telefono,
            direccion: this.direccion.direccion,
            cp: this.direccion.cp,
            poblacion: this.direccion.poblacion,
            provincia: this.direccion.provincia

        })
    }

    modificarDireccion() {
        this.direccion = this.direccionFB.value;
        this.direccion.direccion_id = this.param_id;

        this.direccionService.modificarDireccion(this.direccion).subscribe((res:any) => {
            this.router.navigate([`/cuenta/direccion/${this.direccion.direccion_id}`]);
        }, (err) => {
            console.error(err);
        })
    }

    updateNavDiv(){
        this.navigationService.updateNavDiv.next(this.param_id);
    }
}