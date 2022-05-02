import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Usuario } from "../models/usuario.model";
import { UsuarioService } from "../services/usuario.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent{

    usuarioFB = this.fb.group({
        nombre: ['',[Validators.required, Validators.pattern('[a-zA-Z\s]+')]],
        apellidos: ['', Validators.required],
        email: ['',[Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirm_password: ['', Validators.required]
    });

    private usuario = {} as Usuario;

    constructor(
        private usuarioService: UsuarioService,
        private fb: FormBuilder,
        private router: Router
        ){}


    register(){
        if(this.usuarioFB.valid){
            this.usuarioFB.removeControl('confirm_password');
            this.usuario = this.usuarioFB.value;
            // REGISTRAR USUARIO
            this.usuarioService.register(this.usuario).subscribe((res:any) =>{
                // TODO OK
                this.router.navigate(['/cuenta'])
            }, err => {
                // ERROR AL REGISTRAR
                console.error(err);
            });
        }
        
    }
}