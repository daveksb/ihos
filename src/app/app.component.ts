import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  loginStatus: any;

  constructor(private _http: LoginService) {

    this.loginStatus = _http.loginStatus;

  }

}
