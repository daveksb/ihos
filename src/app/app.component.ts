import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  loginStatus: any;

  constructor(private loginService: LoginService) {

    this.loginStatus = loginService.loginStatus;
    //const res = route.snapshot.routeConfig.path;
  }

}
