import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Carrito } from "../models/carrito.model";
import { ProductoService } from "../services/producto.service";
import { UsuarioService } from "../services/usuario.service";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
    public navbar: string = "notLogged";
    public carritoIsDeclared:boolean = false;

    public carritoList: Carrito[] = [];
    public unidadesCarrito:number = 0;

    public buscarInput = new FormControl();

    constructor(
        private usuarioService: UsuarioService,
        private productoService: ProductoService,
        private router: Router
    ){
        if(this.usuarioService.isLoggedIn()){
            this.navbar = "logged";
        }

        if(this.productoService.comprobarCarrito()){
            this.contarUnidadesCarrito();
            this.carritoIsDeclared = true;
        }
    }

    ngOnInit() {
        this.usuarioService.updateNavbar
            .asObservable()
            .subscribe((info:any) => { this.navbar = info})
        
        this.productoService.updateCarritoNavbar
            .asObservable()
            .subscribe((info:any) => {
                if(this.productoService.comprobarCarrito()){
                    this.contarUnidadesCarrito();
                    this.carritoIsDeclared = true;
                } else if(info === true){
                    this.contarUnidadesCarrito();
                    this.carritoIsDeclared = true;
                }
            })
    }

    logOut(){
        localStorage.removeItem('usuario_id');
        localStorage.removeItem('pcmaniaToken');

        if(!this.usuarioService.isLoggedIn()){
            this.navbar = "notLogged";
        }

        this.router.navigate(['/']).then();
    }

    contarUnidadesCarrito(){
        this.unidadesCarrito = 0;
        let storage_carrito = localStorage.getItem('pcmania_carrito')!;
        let old_carrito: Carrito[] = JSON.parse(storage_carrito);

        old_carrito.forEach((element:any) => {
            this.unidadesCarrito += element.cantidad;
        })
    }

    busqueda(){
        this.router.navigate(['/buscar'], {queryParams: {q: this.buscarInput.value, orderby: 0, page: 1}})
    }
}