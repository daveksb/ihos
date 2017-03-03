import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService) { }

    canActivate() {
        //console.log('Auth-Guard Called : checking to see if logged in');
        //return this.loginService.isLogin;

        if (localStorage.getItem('token')) { return true; }

        return false;
    }
}