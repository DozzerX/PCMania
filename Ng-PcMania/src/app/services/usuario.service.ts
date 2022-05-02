import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from "@angular/common/http"
import { URL_LOCAL } from "../config/config";
import { Usuario } from "../models/usuario.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    updateNavbar = new Subject();

    constructor( public http: HttpClient ) {}

    register(usuario: Usuario) {
        const url = URL_LOCAL + '/auth/register';

        return this.http.post(url, usuario).pipe(map((data:any) =>{
            localStorage.setItem('usuario_id', data.usuario_id);
            localStorage.setItem('pcmaniaToken', data.token);
        }));
    }

    login(email:string, password:string){
        const url = URL_LOCAL + '/auth/login';
        const body = {email, password};

        return this.http.post(url, body).pipe(map((data:any) =>{
            localStorage.setItem('usuario_id', data.usuario_id);
            localStorage.setItem('pcmaniaToken', data.token);
        }));
    }

    getUser(id:string){
        const url = URL_LOCAL + '/usuario/' + id;
        const token = this.getToken();
        const headers = new HttpHeaders({'Authorization': "" + token});

        return this.http.get(url, {headers});
    }

    modificarUsuario(usuario:any){
        const url = URL_LOCAL + '/usuario/modificar';
        const token = this.getToken();
        const headers = new HttpHeaders({'Authorization': "" + token});
        
        return this.http.put(url, usuario, {headers});
    }

    cambiarPassword(current_password:string, new_password:string){
        const url = URL_LOCAL + '/usuario/cambiarpass'
        const body = { current_password, new_password}
        const token = this.getToken();
        const headers = new HttpHeaders({'Authorization': "" + token});

        return this.http.post(url, body, {headers});
    }


    getToken() {
        return localStorage.getItem('pcmaniaToken');
    }

    getLocalStorageId() {
        return localStorage.getItem('usuario_id');
    }

    isLoggedIn() {
        return ( localStorage.getItem('pcmaniaToken') ) ? true : false;
    }
    
    
}