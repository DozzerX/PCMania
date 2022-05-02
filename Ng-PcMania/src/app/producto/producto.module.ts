import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ProductoComponent } from "./producto.component";

@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations:[ProductoComponent],
    exports:[ProductoComponent]
})
export class ProductoModule {}