import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent {

    username: string;

    loginStatus: any

    constructor(loginService: LoginService) {
        this.loginStatus = loginService.loginStatus
    }

}
