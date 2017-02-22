import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../app.config';
import { IAppConfig } from '../../app.config.interface';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchPatientService {

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private _http: Http) { }

    getPatients(keyWord: string) {

        let kw = keyWord.split(" ");
        //console.log("kw0=", kw[0], "kw1=", kw[1])

        if (typeof kw[1] != 'undefined') {
            return this._http.get(this.config.apiEndpoint + 'Patients?filter[where][and][0][name][like]=' + kw[0] + '%25' +
                '&filter[where][and][1][surname][like]=' + kw[1] + '%25' +
                '&filter[limit]=100&access_token=' + localStorage.getItem('token'))
                .map((response) => { return response.json() });
        } else {

            return this._http.get(this.config.apiEndpoint + 'Patients?filter[where][or][0][name][like]=' + kw[0] + '%25' +
                '&filter[where][or][2][personId][like]=' + kw[0] + '%25' +
                '&filter[where][or][3][hn][like]=' + kw[0] + '%25' +
                '&filter[limit]=100&access_token=' + localStorage.getItem('token'))
                .map((response) => { return response.json() });
        }
    };

    // กรณีดึงผู้ป่วยคนเดียว
    getPatient(hn: string) {
        let query = encodeURIComponent(hn);  // มีเครื่องหมายทับ ใน hn ต้องแปลงก่อน
        //console.log('call get patient query = ', query);
        return this._http.get(this.config.apiEndpoint + 'Patients/' + query + '?access_token=' + localStorage.getItem('token'))
            .map((response) => { return response.json() });
    }

}
