import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';

@Component({ 
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
 })
export class LoginComponent implements OnInit {
    login: string;
    password: string;
    returnUrl: string;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.isLoged()) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    onSubmit() {
        this.authenticationService.login(this.login, this.password)
            .subscribe({
                next: () => {
                    this.router.navigate([this.returnUrl]);
                },
                error: error => {
                    this.error = error;
                }
            });
    }
}
