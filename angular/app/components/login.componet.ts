import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login.service';

@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers: [LoginService]
})
export class LoginComponent implements OnInit {
    public titulo: string = "Identificate";
    public user;
    public errorMessage: string;
    public identity;
    public token;

    constructor(
        private _loginService: LoginService
    ) {
    }

    ngOnInit() {
        this.user = {
            "email": "",
            "password": "",
            "gethash": "false"
        }
    }

    onSubmit() {
        console.log(this.user);
        this._loginService.signup(this.user).subscribe(
            response => {
                let identity = response;
                this.identity = identity;

                if (this.identity.length <= 1) {
                    alert("Error en el servidor");
                }
                else {
                    if (!this.identity.status) {
                        localStorage.setItem("identity", JSON.stringify(identity));

                        //GET TOKEN
                        this.user.gethash = "true";
                        this._loginService.signup(this.user).subscribe(
                            response => {
                                let token = response;
                                this.token = token;

                                if (this.token.length <= 0) {
                                    alert("Error en el servidor");
                                }
                                else {
                                    if (!this.token.status) {
                                        localStorage.setItem("token", JSON.stringify(token));

                                        let id = localStorage.getItem('identity');
                                        let tk = localStorage.getItem('token');
                                        console.log("id:" + id);
                                        console.log("tk:" + tk);


                                    }
                                }
                            },
                            error => {
                                this.errorMessage = <any>error;
                                if (this.errorMessage != null) {
                                    console.log(this.errorMessage);
                                    alert("Error en la petición");
                                }
                            }
                        );
                    }
                }
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
    }
}