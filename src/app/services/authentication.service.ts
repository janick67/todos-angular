import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
            .pipe(map(user => {
                this.afterLoginOrRefresh(user);
                return user;
            }));
    }

    logout() {
        this.http.post<any>(`${environment.apiUrl}/auth/logout`, {}).subscribe();
        this.stopRefreshTokenTimer();
        this.userSubject.next(null); 
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    refreshToken() {

        let refreshToken = null;
        if (this.userValue !== null) refreshToken = this.userValue.refreshToken;
        return this.http.post<any>(`${environment.apiUrl}/auth/refresh`, {refreshToken: `Bearer ${refreshToken}`})
        .pipe(map((user) => {
            this.afterLoginOrRefresh(user);
            return user;
        }));
    }

    setUser(user) {
        this.userSubject.next(user);
    }

    // helper methods

    private afterLoginOrRefresh(user) {
        const jwtToken = JSON.parse(atob(user.jwtToken.split('.')[1]));
        user.id = jwtToken.sub;
        user.role = jwtToken.rol;
        localStorage.setItem('user',JSON.stringify(user));
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
    }

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires

        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}