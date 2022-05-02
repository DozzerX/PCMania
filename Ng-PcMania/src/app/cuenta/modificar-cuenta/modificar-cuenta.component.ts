import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
    selector: 'app-cuenta',
    templateUrl: './modificar-cuenta.component.html'
})
export class ModificarCuentaComponent{
    public usuario = {} as Usuario;

    usuarioFB = this.fb.group({
        nombre: ["", [Validators.required, Validators.pattern('[a-zA-Z\s]+')]],
        apellidos: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]]
    })

    constructor(
        private usuarioService: UsuarioService,
        private fb: FormBuilder,
        private router: Router
    ){
        const usuario_id = this.usuarioService.getLocalStorageId();
        if(usuario_id){
            this.usuarioService.getUser(usuario_id).subscribe((res:any) =>{
                this.usuario = res;

                this.usuarioFB.setValue({
                    nombre: this.usuario.nombre,
                    apellidos: this.usuario.apellidos,
                    email: this.usuario.email
                })
            }, (err) =>{
                console.error(err);
            })

        }
    }

    ModificarUsuario(){
        this.usuario = this.usuarioFB.value;
        this.usuarioService.modificarUsuario(this.usuario).subscribe((res:any) => {
            this.router.navigate(['/cuenta'])
        } , (err) => {
            console.error(err);
        })
    }

    
}