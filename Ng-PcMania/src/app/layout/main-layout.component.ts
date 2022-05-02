import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationService } from "../services/navigation.service";

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

    private listRoutes:any[] = [
        "/", 
        "/cuenta", 
        "/cuenta/cambiar-contrase%C3%B1a",
        "/cuenta/direcciones", 
        "/cuenta/pedidos", 
        "/cuenta/modificar-cuenta",
        "/cuenta/crear-direccion", 
        "/cuenta/pedido/", 
        "/cuenta/direccion/",
        "/cuenta/modificar-direccion/",
        "/producto/",
        "/carrito",
        "/login",
        "/register",
        "/informacion",
        "/buscar"
    ];

    public selectedIndex!:number;
    public selectedNav:any[] = [];
    public listNav:any[] = [
        [],
        ["Inicio", "Cuenta"],
        ["Inicio", "Cuenta", "Cambiar contraseña"],
        ["Inicio", "Cuenta", "Direcciones"],
        ["Inicio", "Cuenta", "Pedidos"],
        ["Inicio", "Cuenta", "Modificar cuenta"],
        ["Inicio", "Cuenta", "Direcciones", "Crear dirección"],
        ["Inicio", "Cuenta", "Pedidos", "Pedido"],
        ["Inicio", "Cuenta", "Direcciones", "Dirección"],
        ["Inicio", "Cuenta", "Direcciones", "Dirección", "Modificar direccón"],
        ["Inicio", "Producto"],
        ["Inicio", "Carrito"],
        ["Inicio", "Identificate"],
        ["Inicio", "Registro"],
        ["Inicio", "Información"],
        ["Inicio", "Buscar"]
    ];
    public selectedRouteIndex!:number;
    public selectedRoute:any[] = [];
    public listSelectedRoutes:any[] = [
        [],
        ["/"],
        ["/","/cuenta"],
        ["/","/cuenta"],
        ["/","/cuenta"],
        ["/","/cuenta"],
        ["/","/cuenta", "/cuenta/direcciones"],
        ["/","/cuenta", "/cuenta/pedidos"],
        ["/","/cuenta", "/cuenta/direcciones"],
        ["/","/cuenta", "/cuenta/direcciones", "/cuenta/direccion/"],
        ["/"],
        ["/"],
        ["/"],
        ["/"],
        ["/"],
        ["/"]
    ]

    public firstLoad:boolean = true;
    public current_url:string = "";
    public listNumbers:string[] = ["0","1","2","3","4","5","6","7","8","9"];
    public guardarID:string = "";
    
    constructor(
        private router: Router,
        private navigationService : NavigationService,
        private cd: ChangeDetectorRef
    ){}
    
    
    ngOnInit(): void {
        this.navigationService.updateNavDiv
            .asObservable()
            .subscribe((data:any) => {
                this.guardarID = data
                this.cd.detectChanges(); // confirma que ha sido cambiado despues de init
            });

        this.firstTimeLoad();
        this.updateDivNavigation();
    }

    firstTimeLoad(){
        if(this.firstLoad){
            this.current_url = this.formatUrl(this.router.url);
            this.ifUrlExists(this.current_url);
            this.firstLoad = false;
        } 
    }

    updateDivNavigation(){
        this.router.events.pipe(
            filter((event: any) => event instanceof NavigationStart))
            .subscribe((event:NavigationStart) => {
                this.current_url = this.formatUrl(event.url);
                this.ifUrlExists(this.current_url);
        });
    }
    
    formatUrl(url_arg:string){
        let buscar = url_arg.search("buscar")
        
        if(buscar == 1){
            return "/buscar"
        }

        if(url_arg != "/cuenta/cambiar-contrase%C3%B1a"){
            var url = url_arg.split('');
            url.forEach((char:any, index) => {
                this.listNumbers.forEach((numb:any) => {
                    if(char == numb){
                        delete url[index];
                    }
                })
            })
            var final_url = url.join("");
            return final_url;
        }
        return url_arg;
    }

    ifUrlExists(url_arg:string){
        if(this.listRoutes.includes(url_arg)){
            this.listRoutes.forEach((element:any, index) => {
                if(element == url_arg){
                    this.selectedNav = this.listNav[index];
                    this.selectedIndex = this.selectedNav.length - 1;
                    this.selectedRouteIndex = index;

                    this.selectedRoute = this.listSelectedRoutes[index];
                    if(this.selectedRoute.length == 4){
                        this.selectedRoute[3] = this.formatUrl(this.selectedRoute[3])
                        // this.selectedRoute[3] = this.selectedRoute[3] + this.guardarID;
                    }
                }
            })
        }
    }

}