import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../app.config.interface';

@Injectable()
export class DiagService {

    diagArray: any[] = [];

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private _http: Http) { }

    pushDiags(item) {
        this.diagArray.push(item);
    }

    getDiags() {
        return this.diagArray;
    }

    delDiag(index) {
        this.diagArray.splice(index, 1);
    }

    getICD10(term: string): Observable<Object[]> {
        return this._http
            .get(this.config.apiEndpoint
            + 'Icd101s?filter[where][or][0][name][like]=' + term + '%25'
            + '&filter[where][or][1][code][like]=' + term + '%25'
            + '&filter[include]=clinic'
            + '&access_token=' + localStorage.getItem('token'))
            .map((response) => { return response.json(); });
    }

}
