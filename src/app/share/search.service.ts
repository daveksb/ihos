import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../app.config.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchPatientService {

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private _http: Http) {
        //console.log('init Service : ', new Date());
    }

    getPatients(keyWord: string) {
        let kw = keyWord.split(" ");
        //console.log("kw0=", kw[0], "kw1=", kw[1])

        if (typeof kw[1] != 'undefined') { // กรณีระบุนามสกุล
            return this._http.get(this.config.apiEndpoint + 'Patients?filter[where][and][0][name][like]=' + kw[0] + '%25' +
                '&filter[where][and][1][surname][like]=' + kw[1] + '%25' +
                '&filter[limit]=100&access_token=' + localStorage.getItem('token'))
                .map(res => res.json());

        } else {  // กรณีไม่ระบุนามสกุล
            return this._http.get(this.config.apiEndpoint +
                `Patients?filter[where][or][0][name][like]=${kw[0]}%25&filter[where][or][2][personId][like]=${kw[0]}%25&filter[where][or][3][hn][like]=${kw[0]}%25&filter[limit]=100&access_token=`
                + localStorage.getItem('token')).map(res => res.json());
        }
    };

}
