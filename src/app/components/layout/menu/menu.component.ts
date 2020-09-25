import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authenticationService.logout();
  }

  isLoged(): boolean{
    return this.authenticationService.isLoged(); 
  }

  login(){
    this.router.navigate(['login']);
  }

  register(){
    this.router.navigate(['register']);
  }
}
