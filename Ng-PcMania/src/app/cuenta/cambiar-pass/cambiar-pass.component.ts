import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
    selector: 'app-cuenta',
    templateUrl: './cambiar-pass.component.html'
})
export class CambiarPass{
    passwordFB = this.fb.group({
        current_password:["", Validators.required],
        new_password:["", Validators.required],
        confirm_password:["", Validators.required]
    })

    public validarPasswords:boolean = false;
    public tituloModal:string = "";
    public bodyModal:string = "";

    constructor(
        private usuarioService: UsuarioService,
        private fb: FormBuilder,
        private router: Router
    ){}

    ngOnInit(){
        this.passwordFB.get("confirm_password")?.valueChanges.subscribe(pass => {
            if(this.passwordFB.get("confirm_password")?.value === this.passwordFB.get("new_password")?.value){
                this.validarPasswords = true;
            } else {
                this.validarPasswords = false;
            }
        })

        this.passwordFB.get("new_password")?.valueChanges.subscribe(pass => {
            if(this.passwordFB.get("new_password")?.value === this.passwordFB.get("confirm_password")?.value){
                this.validarPasswords = true;
            } else {
                this.validarPasswords = false;
            }
        })
    }

    ModificarPassword(){
        var current_password = this.passwordFB.get("current_password")?.value;
        var new_password = this.passwordFB.get("new_password")?.value;
        var confirm_password = this.passwordFB.get("confirm_password")?.value;

        if(new_password === confirm_password){
            this.usuarioService.cambiarPassword(current_password, new_password ).subscribe((res:any) => {
                if(res.msg === true){
                    this.tituloModal = "Correcto!";
                    this.bodyModal = "La contraseña fue cambiada.";
                    this.passwordFB.setValue({
                        current_password: "",
                        new_password: "",
                        confirm_password: ""
                    });
                }
            }, (err) => {
                this.tituloModal = "Error!";
                this.bodyModal = "La contraseña es incorecta."

                console.error(err);
            })

        }
    }

    Retroceder(){
        this.router.navigate(['/cuenta'])
    }
}