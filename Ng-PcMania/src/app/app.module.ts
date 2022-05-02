import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { MainLayoutComponent } from './layout/main-layout.component';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './footer/footer.module';
import { HttpClientModule } from '@angular/common/http';
import { InicioModule } from './inicio/inicio.module';
import { ProductoModule } from './producto/producto.module';
import { CarritoModule } from './carrito/carrito.module';
import { BuscarModule } from './buscar/buscar.module';
import { InformacionModule } from './informacion/informacion.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    NavbarModule,
    SidebarModule,
    FooterModule,
    InicioModule,
    ProductoModule,
    CarritoModule,
    BuscarModule,
    InformacionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
