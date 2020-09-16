import { AuthenticationService } from '../services/authentication.service';

export function appInitializer(authenticationService: AuthenticationService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        let user = JSON.parse(localStorage.getItem('user'));
        authenticationService.setUser(user);
        if (user != null){
            authenticationService.refreshToken()
                .subscribe()
                .add(resolve);
        }else{
            resolve()
        }
   
    });
}