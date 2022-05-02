import { Routes } from "@angular/router";
import { BuscarComponent } from "./buscar/buscar.component";
import { CarritoComponent } from "./carrito/carrito.component";
import { AuthGuard } from "./guards/auth.guard";
import { InformacionComponent } from "./informacion/informacion.component";
import { InicioComponent } from "./inicio/inicio.component";
import { MainLayoutComponent } from "./layout/main-layout.component";
import { ProductoComponent } from "./producto/producto.component";


export const AppRoutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: InicioComponent
            }, {
                path: 'producto/:id' ,
                component: ProductoComponent
            }, {
                path: 'carrito',
                component: CarritoComponent
            }, {
                path: 'buscar',
                component: BuscarComponent
            }, {
                path: 'informacion',
                component: InformacionComponent
            }, {
                path: 'login',
                loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
            }, {
                path: 'register',
                loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
            }, {
                path: 'cuenta',
                loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule),
                canActivate:[AuthGuard]
            }
        ]
    }
]