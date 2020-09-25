import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fname:string;
  lname:string;
  password:string;
  email:string;
  login:string;
  error:string;

  constructor(private authenticationService: AuthenticationService,private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    this.authenticationService.register({fname: this.fname,lname: this.lname,password: this.password,email: this.email,login: this.login})
    .subscribe({
        next: () => {
            this.router.navigate(['login']);
        },
        error: error => {
            this.error = error;
        }
    });
  }
}
