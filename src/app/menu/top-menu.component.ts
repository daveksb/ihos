import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

    username: string;

    isLogin: any

    constructor(loginService: LoginService) {
        this.isLogin = loginService.isLogin;
    }

    ngOnInit() {
        this.username = localStorage.getItem('username');
    }

    logout() {
        localStorage.clear();
    }
}
