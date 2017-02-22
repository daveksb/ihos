import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../app.config.interface';

@Injectable()
export class VitalsignService {

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private _http: Http) { }

    getDiagNote(regno: string): Observable<Object> {
        return this._http
            .get(this.config.apiEndpoint + 'Diagnotes/' + regno + '?access_token=' + localStorage.getItem('token'))
            .map((response) => { return response.json(); });
    }
}
