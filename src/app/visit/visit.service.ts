import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../app.config.interface';

@Injectable()

export class VisitService {

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private _http: Http) { }

    /*     getPatients(term: string): Observable<Object[]> {
    
            let today = new Date().toJSON().slice(0, 10);
            //console.log('today =', today)
    
            return this._http
                .get(this.config.apiEndpoint + 'Diagregs?filter[where][and][0][date][gte]=' + today +
                '&filter[where][and][1][stspclinic]=2&filter[order]=date%20DESC&access_token=' + localStorage.getItem('token'))
                .map(response => { return response.json(); });
        }
     */
    /*     getHN(regno: string): Observable<any> {
    
            return this._http.get(this.config.apiEndpoint
                + 'Diagregs?filter[where][regno]=' + regno +
                + '&access_token='
                + localStorage.getItem('token'))
                .map(response => { return response.json(); });
        } */

    getDiagreg(term: string): Observable<any> {
        return this._http
            .get(this.config.apiEndpoint + 'Diagregs/findOne?filter[where][regno]=' + term + '&access_token=' + localStorage.getItem('token'))
            .map(response => { return response.json(); });
    }

}