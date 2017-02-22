import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { APP_CONFIG } from '../../app.config';
import { IAppConfig } from '../../app.config.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ItemObj } from '../item.model';

@Injectable()
export class DentalService {

    subRoomArray: any[] = [];

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private _http: Http) { }

    pushSubRoomRec(item) {
        this.subRoomArray.push(item);
    }

    getSubRoomArray() {
        return this.subRoomArray;
    }

    delSubRoomArray(index) {
        this.subRoomArray.splice(index, 1);
    }

    getItems(term: string): Observable<Object[]> {
        return this._http
            .get(this.config.apiEndpoint + 'Items?filter[where][or][0][name][like]=' + term
            + '%25&filter[where][or][1][code][like]=' + term
            + '%25&access_token=' + localStorage.getItem('token'))
            .map((response) => { return response.json(); });
    }

    /*    getDentMain(code: string): Observable<any> {
            return this._http
                .get(this.config.apiEndpoint + 'Items?filter[where][code][like]=' + code
                + '%25&access_token=' + localStorage.getItem('token'))
                .flatMap(data => data.json());
            //.filter(res =>  )            
            //.map(data => data.code.substr(0, 4))                        
        }*/

    getDentMain(code: string): Observable<any> {
        return this._http
            .get(this.config.apiEndpoint + 'Items?filter[where][code][like]=' + code
            + '%25&access_token=' + localStorage.getItem('token'))
            //.publish()
            .flatMap(res => {
                let temp = res.json();
                return temp;
            }
            )
            .map((res: any) => res.code.substr(0, 4))
    }

    getDentSub(term: string): Observable<string[]> {
        return this._http
            .get(this.config.apiEndpoint + 'Items?filter[where][code][like]=' + term
            + '%25&access_token=' + localStorage.getItem('token'))
            .map(res => { return res.json(); });
    }

    getIcd9(term: string): Observable<any> {
        return this._http
            .get(this.config.apiEndpoint + 'Icdcm1s/findOne?filter[where][code]=' + term + '&access_token=' + localStorage.getItem('token'))
            .map((response) => { return response.json(); });
    }

    getIcd9s(term: string): Observable<Object[]> {
        return this._http
            .get(this.config.apiEndpoint + 'Icdcm1s?filter[where][or][0][name][like]=' + term
            + '%25&filter[where][or][1][code][like]=' + term
            + '%25&access_token=' + localStorage.getItem('token'))
            .map((response) => { return response.json(); });
    }

    getDiagreg(term: string): Observable<any> {
        return this._http
            .get(this.config.apiEndpoint + 'Diagregs/findOne?filter[where][regno]=' + term + '&access_token=' + localStorage.getItem('token'))
            .map((response) => { return response.json(); });
    }

}
