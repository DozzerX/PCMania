import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NavbarComponent } from "./navbar.component";

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ]
})

export class NavbarModule {}