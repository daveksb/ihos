import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { GrowlModule, Message } from 'primeng/primeng';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

    alertMsg: Message[] = [];
    loginStatus: any;

    loginform: Object = { username: '', password: '', ttl: 0 };

    constructor(private loginService: LoginService) {
        this.loginStatus = loginService.loginStatus;
    }

    ngOnInit() { }

    login(loginform) {

        let body: Object = {
            "username": loginform.username,
            "password": loginform.password,
            "ttl": 43200  //6hours
        }
        this.loginService.login(body);
        this.alertMsg = this.loginService.msg;
    }

    logout() {
        //console.log('logout comp')
        this.loginService.logout();
        this.alertMsg.push({ severity: 'warn', summary: 'ออกจากระบบเรียบร้อย !!', detail: '' });
    }

}
