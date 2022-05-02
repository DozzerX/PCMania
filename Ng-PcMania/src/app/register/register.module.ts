import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { RegisterComponent } from "./register.component";
import { RegisterRoutes } from "./register.routes";

@NgModule({
    imports:[
        RouterModule.forChild(RegisterRoutes),
        CommonModule,
        ReactiveFormsModule
    ],
    declarations:[RegisterComponent],
    exports: []
})
export class RegisterModule{}