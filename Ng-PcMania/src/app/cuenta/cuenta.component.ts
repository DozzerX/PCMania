import { Component } from "@angular/core";
import { Usuario } from "../models/usuario.model";
import { UsuarioService } from "../services/usuario.service";

@Component({
    selector: 'app-cuenta',
    templateUrl: './cuenta.component.html'
})
export class CuentaComponent {

    public usuario = {} as Usuario;
    
    
    constructor(
        private usuarioService: UsuarioService
    ){
        const usuario_id = this.usuarioService.getLocalStorageId();
        if(usuario_id) { // Si existe proseguir
            this.usuarioService.getUser(usuario_id).subscribe((res:any) => {
                this.usuario = res;
            }, (err) => {
                console.error(err);
            })
        }
        
    }
}