import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../app.config.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ReportService {

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private _http: Http) { }

    getReport1(input: string[]): Observable<any> {

        let param = "a1=" + input[0] + "&a2=" + input[1] + "&a3=" + input[2] + "&a4=" + input[3] + "&a5=" + input[4];

        return this._http
            .get(this.config.reportApi + 'report1?' + param).map(response => { return response.json(); })
    }

    getReportGeo(): Observable<any> {
        return this._http.get(this.config.reportApi + 'reportgeo').map(response => { return response.json(); })
    }

    getReportAge(): Observable<any> {
        return this._http.get(this.config.reportApi + 'reportage').map(response => { return response.json(); })
    }

    getReportLab(hn: string): Observable<any> {
        return this._http.get(this.config.reportApi + 'report-lab?hn=' + hn).map(response => { return response.json(); })
    }
}
