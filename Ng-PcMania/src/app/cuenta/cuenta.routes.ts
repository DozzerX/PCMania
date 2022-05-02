import { Routes } from "@angular/router";
import { CambiarPass } from "./cambiar-pass/cambiar-pass.component";
import { CrearDireccionComponent } from "./crear-direccion/crear-direccion.component";
import { CuentaComponent } from "./cuenta.component";
import { DireccionComponent } from "./direccion/direccion.component";
import { DireccionesComponent } from "./direcciones/direcciones.component";
import { ModificarCuentaComponent } from "./modificar-cuenta/modificar-cuenta.component";
import { ModificarDireccionComponent } from "./modificar-direccion/modificar-direccion.component";
import { PedidoComponent } from "./pedido/pedido.component";
import { PedidosComponent } from "./pedidos/pedidos.component";

export const CuentaRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: CuentaComponent
            }, {
                path: 'cambiar-contraseña',
                component: CambiarPass
            }, {
                path: 'direcciones',
                component: DireccionesComponent
            }, {
                path: 'pedidos',
                component: PedidosComponent
            }, {
                path: 'pedido/:id',
                component: PedidoComponent
            }, {
                path: 'modificar-cuenta',
                component: ModificarCuentaComponent
            }, {
                path: 'crear-direccion',
                component: CrearDireccionComponent
            }, {
                path: 'direccion/:id',
                component: DireccionComponent
            }, {
                path: 'modificar-direccion/:id',
                component: ModificarDireccionComponent
            }
        ]
    }
]