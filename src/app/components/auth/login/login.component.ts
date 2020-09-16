import { Component } from '@angular/core';
import { JwtService } from '../../../services/jwt.service';
import { Router } from '@angular/router'
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  email:string;
  password:string;

    constructor(private authenticationService:AuthenticationService, private _router: Router) {}

    login() {
        if (this.email && this.password) {
            //this.JwtService.login(this.email, this.password)
            this.authenticationService.login(this.email, this.password)
                .subscribe(
                    () => {
                        console.log("User is logged in");
                        this._router.navigateByUrl('/');
                    }
                );
        }
    }
}

