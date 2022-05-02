import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_LOCAL } from "../config/config";
import { Direccion } from "../models/direccion.model";


@Injectable({
    providedIn: 'root'
})
export class DireccionService {

    constructor( public http: HttpClient ){}

    getDirecciones(){
        const url = URL_LOCAL + "/direcciones";
        const token = this.getToken();
        const headers = new HttpHeaders({"Authorization": "" + token});

        return this.http.get(url, {headers});
    }

    getDireccion(id:number) {
        const url = URL_LOCAL + "/direccion/" + id;
        const token = this.getToken();
        const headers = new HttpHeaders({"Authorization": "" + token});

        return this.http.get(url, {headers});
    }

    crearDireccion(direccion: Direccion){
        const url = URL_LOCAL + "/direccion/crear";
        const token = this.getToken();
        const headers = new HttpHeaders({"Authorization": "" + token});

        return this.http.post(url, direccion, {headers});

    }

    modificarDireccion(direccion: Direccion){
        const url = URL_LOCAL + "/direccion/modificar";
        const token = this.getToken();
        const headers = new HttpHeaders({"Authorization": "" + token});

        return this.http.put(url, direccion, {headers});
    }

    borrarDireccion(id:number){
        const url = URL_LOCAL + "/direccion/borrar/" + id;
        const token = this.getToken();
        const headers = new HttpHeaders({"Authorization": "" + token});

        return this.http.delete(url, {headers});
    }

    getToken() {
        return localStorage.getItem('pcmaniaToken');
    }
}