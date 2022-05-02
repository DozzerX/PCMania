import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { LoginRoutes } from "./login.routes";

@NgModule({
    imports:[
        RouterModule.forChild(LoginRoutes),
        CommonModule,
        ReactiveFormsModule
    ],
    declarations:[LoginComponent],
    exports: []
})
export class LoginModule{}