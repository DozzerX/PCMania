import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { InformacionComponent } from "./informacion.component";

@NgModule({
    imports:[RouterModule],
    declarations:[
        InformacionComponent
    ],
    exports:[]
})
export class InformacionModule {}