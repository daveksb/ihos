import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../app.config.interface';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

export interface LogStatus {
    value: Boolean;
}

@Injectable()
export class LoginService {

    msg: Message[] = [];
    isLogin: LogStatus = { value: false };

    constructor(private router: Router, @Inject(APP_CONFIG) private config: IAppConfig, private _http: Http) {

        console.log('login service Called..')
    }

    login(body: Object): any {
        let options: any;
        return this._http.post(this.config.apiEndpoint + 'users/login', body, options)
            .map((response) => { return response.json(); })
            .subscribe(response => {
                localStorage.setItem('token', response.id);
                localStorage.setItem('username', response.userId);
                localStorage.setItem('isLogin', 'true');
                this.isLogin.value = true;
                this.router.navigate(['newvisit']);
            },
            error => {
                this.msg.push({ severity: 'error', summary: 'username หรือ password', detail: ' ไม่ถูกต้อง !!' });
            }
            );
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        //console.log('logout service')
        localStorage.clear();
        this.isLogin.value = false;
    }



}
