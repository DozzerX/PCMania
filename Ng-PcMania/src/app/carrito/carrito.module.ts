import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CarritoComponent } from "./carrito.component";

@NgModule({
    imports:[
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
    declarations:[CarritoComponent],
    exports:[]
})
export class CarritoModule {}