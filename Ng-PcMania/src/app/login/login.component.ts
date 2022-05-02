import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UsuarioService } from "../services/usuario.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent{

    loginFB = this.fb.group({
        email:['', [Validators.required, Validators.email]],
        password:['', Validators.required]
    })

    public loginIncorecto:boolean = false;

    constructor(
        private usuarioService:UsuarioService,
        private fb: FormBuilder,
        private router: Router
        ){}

    login(){
        if(this.loginFB.valid){
            const email = this.loginFB.get('email')?.value;
            const password = this.loginFB.get('password')?.value;

            this.usuarioService.login(email, password).subscribe((res:any) =>{

                this.usuarioService.updateNavbar.next("logged"); //pasar información a navbar
                this.router.navigate(['/']);

            }, err => {
                this.loginIncorecto = true;
                console.error(err);
            });
        }
    }
}

    