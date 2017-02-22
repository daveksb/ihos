import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { GrowlModule, Message } from 'primeng/primeng';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

    alertMsg: Message[] = [];
    isLogin: any;

    loginform: Object = { username: '', password: '', ttl: 0 };

    constructor(private _http: LoginService) {
        this.isLogin = _http.isLogin;
    }

    ngOnInit() { }

    login(loginform) {

        let body: Object = {
            "username": loginform.username,
            "password": loginform.password,
            "ttl": 43200  //6hours
        }
        this._http.login(body);
        this.alertMsg = this._http.msg;
    }

    logout() {
        //console.log('logout comp')
        this._http.logout();
        this.alertMsg.push({ severity: 'warn', summary: 'ออกจากระบบเรียบร้อย !!', detail: '' });
    }

}
