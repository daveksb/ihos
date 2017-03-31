import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../app.config.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Patient } from '../share/model/patient';
import { DiagReg } from '../share/model/diagreg';

@Injectable()

export class RegisterService {

    constructor( @Inject(APP_CONFIG) private config: IAppConfig, private _http: Http) {
    }

    opdCard(patient: Object) {
        let body = JSON.stringify(patient);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: 'post' });
        return this._http.post(this.config.reportApi + "opd", body, options).map((response) => { return response.json(); });
    }

    prescription(patient: Object) {
        let body = JSON.stringify(patient);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: 'post' });
        return this._http.post(this.config.reportApi + "prescription", body, options).map((response) => { return response.json(); });
    }

    insertDiagReg(diagReg: DiagReg) {
        let body = JSON.stringify(diagReg);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: 'post' });
        let postUrl = this.config.apiEndpoint + 'DiagRegs?access_token=' + localStorage.getItem('token');
        return this._http.post(postUrl, body, options).map(res => { return res.json() })
        //.flatMap((mock) => this._http.post(this.config.apiEndpoint + 'Patients/' + mock.hn + '/address', body2, options))            
    }

    roomList = [
        { col: 'stdiag', name: 'ห้องตรวจโรคทั่วไป' },
        { col: 'stlr', name: 'ห้องคลอด' },
        { col: 'stdent', name: 'ฝ่ายทันตกรรม' },

        { col: 'sthp', name: 'ส่งเสริมสุขภาพ/PCU' },
        { col: 'ster', name: 'ห้อง ER' },
        { col: 'stor', name: 'ห้อง ผ่าตัด' },

        { col: 'stspclinic', name: 'คลินิคพิเศษ' },
        { col: 'stlab', name: 'ห้อง Lab' },
        { col: 'stcmdoc', name: 'หัตถการห้องตรวจ' },

        { col: 'stxray', name: 'ห้อง X-Ray' },
        { col: 'stherbal', name: 'นวดแผนไทย' },
        { col: 'stherbal1', name: 'กายภาพบำบัด' },

        { col: 'stherbal2', name: 'คลินิคให้คำปรึกษา' },
        { col: 'stccc', name: 'CCC' },
        { col: 'stsanita', name: 'กลุ่มงานเวชฯ' }
    ]

    createPatient(patient: Patient) {
        //console.log('patient=', patient);
        let body = JSON.stringify(patient);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: 'post' });
        let postUrl = this.config.apiEndpoint + 'Patients?access_token=' + localStorage.getItem('token');
        return this._http.post(postUrl, body, options).map(res => { return res.json() })
        //.flatMap((mock) => this._http.post(this.config.apiEndpoint + 'Patients/' + mock.hn + '/address', body2, options))            
    }


    updatePatient(patient: Patient) {

        let body = JSON.stringify(patient);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: 'put' });
        let putUrl = this.config.apiEndpoint + 'Patients?access_token=' + localStorage.getItem('token');

        return this._http.put(putUrl, body, options)
            .map((res: Response) => { return res.json() })
    }


    en2thdate(d: any) { //แปลงวันที่จาก eng เป็น thai
        if (d) { // วันที่ไม่ใช่ค่าว่าง
            let data = new Date(d);
            data.setFullYear(data.getFullYear() + 543); // แปลง ค.ศ. เป็น พ.ศ.
            let bd = data.toISOString().slice(0, 10);
            let temp = bd.split('-');
            //let thDate = temp[2] + '-' + temp[1] + '-' + temp[0]; // สลับ ปี <-> วันที่
            let thDate = temp[2] + temp[1] + temp[0]; // สลับ ปี <-> วันที่
            //console.log('en2thDate was Called thDate = ', thDate);
            return thDate;
        }
        return null; // กรณีไม่มีข้อมูล หรือ d= null
    }

    getTable(tableName: string): Observable<Object[]> {
        return this._http.get(this.config.apiEndpoint + tableName).map((response) => {
            return response.json();
        });
    }

    getAddressName(id: string) {
        return this._http.get(this.config.apiEndpoint + 'addresses/findOne?filter[where][code]=' + id).map(response => { return response.json() });
    };

    getAmpurByProvince(pvCode) {
        let shortCode = pvCode.slice(0, 2);// เอาเฉพาะ 2 ตัวหน้าของ code
        //return this._http.get(this.config.apiEndpoint + 'addresses?filter[where][and][0][type]=2&filter[where][and][1][code][like]=' + shortCode + '%25')
        return this._http.get(this.config.apiEndpoint + 'LAmpurs?filter[where][and][0][changwatco]=' + shortCode)
            .map((response) => { return response.json() });
    };

    getTambonByAmpur(pvCode) {
        //let shortCode = pvCode.slice(0, 4);// เอาเฉพาะ 4 ตัวหน้าของ code
        let code2 = pvCode.slice(0, 2);// เอาเฉพาะ 2 ตัวหน้าของ code
        let code3 = pvCode.slice(2, 4);// เอาเฉพาะ 2 ตัวหน้าของ code
        //return this._http.get(this.config.apiEndpoint + 'addresses?filter[where][and][0][type]=3&filter[where][and][1][code][like]=' + shortCode + '%25')
        return this._http.get(this.config.apiEndpoint + 'LTumbons?filter[where][and][0][changwatco]=' + code2 + '&filter[where][and][1][ampurcode]=' + code3)
            .map((response) => { return response.json() });
    };

    getTime() {
        let d = new Date();
        d.setHours(d.getHours() + 7);
        let dat = d.toISOString()
        return dat;
    }

    getHos(type: string) {  // find matched hos
        return this._http
            .get(this.config.apiEndpoint + 'LHospitals?filter[where][offId][like]=' + type + '%25')
            //.get(this.config.apiEndpoint + 'LHospitals?filter[where][and][0][offName2]=' + type + '&filter[where][and][1][changwat]=36')
            .map((response) => { return response.json(); });
    };

    loadHos(type: string) {  // load specific hos
        return this._http
            .get(this.config.apiEndpoint + 'LHospitals?filter[where][offId]=' + type)
            .map((response) => { return response.json(); });
    };

    getLastHN() {
        return this._http
            .get(this.config.apiEndpoint + 'patients/findOne?filter[fields][hn]=true&filter[order]=hn%20DESC&filter[limit]=1&access_token=' + localStorage.getItem('token'))
            .map(response => { return response.json(); });
    }

    getLastQue() {
        let today = new Date().toLocaleDateString()
        return this._http
            //.get(this.config.apiEndpoint + 'Diagregs/findOne?filter[where][date][gte]=' + today + '&filter[fields][qno]=true&filter[order]=qno%20DESC&access_token=' + localStorage.getItem('token'))
            .get(this.config.apiEndpoint + 'Diagregs/findlastque')
            .map(response => { return response.json(); });
    }

    leftPad(number, targetLength) { // เติม 0 ลงไปด้านหน้าให้ครบ targetLength
        var output = number + '';
        while (output.length < targetLength) { output = '0' + output; }
        return output;
    }
}
