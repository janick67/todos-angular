import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})

export class JwtService {
  baseUrl:string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  login(email:string, password:string) {
    return this.httpClient.post<{accessToken:  string}>(`${this.baseUrl}auth/login`, {email, password}).pipe(tap(res => {
      console.log(res);
    localStorage.setItem('accessToken', res.accessToken);
    }))
  }

  register(email:string, password:string) {
    return this.httpClient.post<{access_token: string}>(`${this.baseUrl}auth/register`, {email, password}).pipe(tap(res => {
    this.login(email, password)
    }))
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('accessToken') !==  null;
  }
}