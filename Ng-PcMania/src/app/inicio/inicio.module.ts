import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { InicioComponent } from "./inicio.component";

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations:[InicioComponent],
    exports:[InicioComponent]
})
export class InicioModule {}