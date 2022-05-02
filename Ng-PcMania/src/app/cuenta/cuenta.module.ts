import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { CuentaRoutes } from "./cuenta.routes";

import { CambiarPass } from "./cambiar-pass/cambiar-pass.component";
import { CuentaComponent } from "./cuenta.component";
import { DireccionesComponent } from "./direcciones/direcciones.component";
import { ModificarCuentaComponent } from "./modificar-cuenta/modificar-cuenta.component";
import { PedidosComponent } from "./pedidos/pedidos.component";
import { CrearDireccionComponent } from "./crear-direccion/crear-direccion.component";
import { DireccionComponent } from "./direccion/direccion.component";
import { ModificarDireccionComponent } from "./modificar-direccion/modificar-direccion.component";
import { PedidoComponent } from "./pedido/pedido.component";

@NgModule({
    imports:[
        RouterModule.forChild(CuentaRoutes),
        ReactiveFormsModule,
        CommonModule
    ],
    declarations:[
        CuentaComponent,
        CambiarPass,
        DireccionesComponent,
        PedidosComponent,
        ModificarCuentaComponent,
        CrearDireccionComponent,
        DireccionComponent,
        ModificarDireccionComponent,
        PedidoComponent
    ]
})
export class CuentaModule {}