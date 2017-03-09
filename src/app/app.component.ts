import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  loginStatus: any;

  constructor(private _http: LoginService, private route: ActivatedRoute) {

    this.loginStatus = _http.loginStatus;

    //const res = route.snapshot.routeConfig.path;
    //console.log('res = ', res);

  }

}
