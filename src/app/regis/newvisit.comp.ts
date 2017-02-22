import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../app.config.interface';
import { RegisterService } from '../share/service/register.service';
import { SearchPatientService } from '../share/service/search.service';
import { Patient } from '../share/model/patient';
import { DiagReg } from '../share/model/diagreg';
import { SearchPatientComp } from './search.comp';
import { ConfirmationService } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
    selector: 'newvisit',
    templateUrl: 'newvisit.comp.html',
    styleUrls: ['./regis.css'],
})

export class NewVisitComp implements OnInit {

    newRegNo: any;
    newQ: any;
    tempPatient: Patient = new Patient('');
    classList: Object[];
    rooms: Object[];
    visitForm: FormGroup;
    hos1List = [];
    hos2List = [];
    nationList = [];
    occupaList = [];
    currentRoom: string = '';
    clock: any;
    officeHour: boolean;
    buttonNum = [{ min: -1, max: 3 }, { min: 2, max: 6 }, { min: 5, max: 9 }, { min: 8, max: 12 }, { min: 11, max: 15 }];

    items1: Observable<string[]>; // ผลลัพทธ์ การค้นหา
    items2: Observable<string[]>;
    private searchTermStream1 = new Subject<string>(); // stream ที่สร้างจาก input ของเรา
    private searchTermStream2 = new Subject<string>(); // stream ที่สร้างจาก input ของเรา

    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private route: ActivatedRoute,
        private router: Router,
        private regisService: RegisterService,
        private searchService: SearchPatientService,
        private _fb: FormBuilder,
        private confirmationService: ConfirmationService) {
        this.items1 = this.searchTermStream1.debounceTime(300).distinctUntilChanged().switchMap((term: string) => this.regisService.getHos(term));
        this.items2 = this.searchTermStream2.debounceTime(300).distinctUntilChanged().switchMap((term: string) => this.regisService.getHos(term));
    }

    ngOnInit() {
        this.createRegNo();
        this.initForm();
        this.route.params.subscribe(
            params => {
                if (params['hn']) {  // เฉพาะเมื่อมีค่า hn ส่งมาทาง url จึงทำส่วนนี้
                    this.searchService.getPatient(params['hn']).subscribe(
                        res => { this.patientChanged(res) }
                    )
                }
            }
        );
        this.isOfficeHour();
        this.items1.subscribe(val => this.hos1List = val);  // ดักรอค่า hos1List
        this.items2.subscribe(val => this.hos2List = val);
        this.clock = Observable.interval(1000).map(() => new Date());
        this.rooms = this.regisService.roomList;
        this.regisService.getTable('socials').subscribe(res => this.classList = res);  //สิทธิ์
        this.regisService.getTable('nations').subscribe(res => this.nationList = res);  //สัญชาติ - เชื้อชาติ
        this.regisService.getTable('occupats').subscribe(res => this.occupaList = res);  //สัญชาติ - เชื้อชาติ
    }

    editPatient() {
        this.router.navigate(['/edit-patient', this.tempPatient.hn]);
    }

    printOpd() {
        this.regisService.opdCard(this.tempPatient).subscribe(res => { });
        setTimeout(() => {
            window.open(this.config.serverIP + 'output.docx', '_blank');
        }, 350);
    }

    searchHos1(term: string) {
        if (term.length > 3) {
            this.searchTermStream1.next(term);
            this.visitForm.patchValue({ hos1: term }); //กำหนดค่าให้ drop down hos1
        }
    } // function ที่รับ string มา แล้วทำการสร้าง observable ใหม่ขึ้นมา

    searchHos2(term: string) {
        if (term.length > 3) {
            this.searchTermStream2.next(term);
            this.visitForm.patchValue({ hos2: term }); //กำหนดค่าให้ drop down hos1
        }
    }

    isOfficeHour() {
        let d = new Date();
        let n = d.getHours();
        if (n > 7 && n < 17) { //เวลาทำงาน 7.00-17.00 น.
            this.officeHour = true; return 1
        } else { this.officeHour = false; return 2 }
    }

    confirm(formValue) {
        this.confirmationService.confirm({
            message: 'บันทึกข้อมูลส่งตรวจ ?',
            accept: () => { this.createVisit(formValue) }
        });
    }

    initForm() {
        this.visitForm = this._fb.group({
            regno: [null, Validators.required], hn: [null, Validators.required],
            qno: null, titles: null, name: [null, Validators.required], surname: [null, Validators.required],
            room: '00', count: 0, typedate: null,
            insureCard: null, insureBdate: null, insureEdate: null,
            hos1: null, hos2: null, date: null, time: null, class: null,
            refer: 99, stpatient: 1, stdiag: 1, stspclinic: 1, stsanita: 1,
            stdent: 1, sthp: 1, stlr: 1, ster: 1, stxray: 1, stlab: 1, stadmit: 1, stor: 1,
            stherbal: 1, stdrug: 1, stpay: 1, stopd: 1, stdrg: 1, stdrger: 1, stdead: 1,
            stadiag: 1, stobs: 1, stfree: 1, stherbal2: 1, stccc: 1, stpcard: 1,
        });
    }

    resetStRoom() {
        this.visitForm.patchValue({
            stdiag: 1, stlr: 1, stdent: 1, sthp: 1, ster: 1,
            stor: 1, stspclinic: 1, stlab: 1, stcmdoc: 1, stxray: 1,
            stherbal: 1, stherbal1: 1, stherbal2: 1, stccc: 1, stsanita: 1,
        })
    }

    index2string(index, type) {
        let temp = [{ name: '' }];
        if (type == 'nation') { temp = _.filter(this.nationList, { 'code': index }) }
        if (type == 'occupa') { temp = _.filter(this.occupaList, { 'code': index }) }
        if (type == 'class') { temp = _.filter(this.classList, { 'code': index }) }
        let result = temp[0].name;
        return result;
    }

    patientChanged(patient: Patient) {

        this.tempPatient = patient;
        this.regisService.getAddressName(patient.tambon).subscribe(res => { this.tempPatient.tambon = res.name; });
        this.regisService.getAddressName(patient.ampur).subscribe(res => { this.tempPatient.ampur = res.name; });
        this.regisService.getAddressName(patient.province).subscribe(res => { this.tempPatient.province = res.name; });
        this.regisService.loadHos(patient.hos1).subscribe(res => { this.hos1List = res; });
        this.regisService.loadHos(patient.hos2).subscribe(res => { this.hos2List = res; });
        this.tempPatient.insBdateTH = this.regisService.en2thdate(patient.insureBdate);
        this.tempPatient.insEdateTH = this.regisService.en2thdate(patient.insureEdate);
        this.tempPatient.lastdateTH = this.regisService.en2thdate(patient.lastdate);
        this.tempPatient.birthdayTH = this.regisService.en2thdate(patient.birthday);
        this.tempPatient.nationTH = this.index2string(this.tempPatient.nation, 'nation');
        this.tempPatient.raceTH = this.index2string(this.tempPatient.race, 'nation');
        this.tempPatient.occupaTH = this.index2string(this.tempPatient.occupa, 'occupa');
        this.tempPatient.classTH = this.index2string(this.tempPatient.class, 'class');
        this.tempPatient.todayTH = this.regisService.en2thdate(new Date());

        this.visitForm.patchValue({
            regno: this.newRegNo,
            qno: this.newQ,
            hn: patient.hn,
            count: patient.count + 1,
            typedate: this.isOfficeHour(),
            titles: patient.titles,
            name: patient.name,
            surname: patient.surname,
            date: new Date(),
            class: patient.class,
            insureCard: patient.insureCard,
            hos1: patient.hos1,
            hos2: patient.hos2,
            time: new Date().toTimeString().slice(0, 8), //เอาแค่ 8 ตัวแรก ถ้าเกินจะเกิด error
        });
        //console.log('tempPatient = ', this.tempPatient);
        //console.log('current room = ', this.currentRoom);
        //console.log('regno = ', this.visitForm.controls['regno'].valid);
    }

    createRegNo() {
        //console.log('call : create regno ');
        let temp = new Date().toLocaleDateString([], { month: "2-digit", day: "2-digit" });
        this.regisService.getLastQue().subscribe(
            data => {
                if (data) { // กรณีวันนั้น มี que ก่อนหน้า
                    let newQ = data.qno + 1;
                    let result = '60-' + temp.slice(0, 2) + '-' + temp.slice(3, 6) + '-' + this.regisService.leftPad(newQ, 4);
                    //console.log('reg no = ', result);
                    this.newRegNo = result;
                    this.newQ = newQ;
                }
                // กรณีวันนั้น ไม่มี que ก่อนหน้า
                this.newQ = 1;
                this.newRegNo = '60-' + temp.slice(0, 2) + '-' + temp.slice(3, 6) + '-' + this.regisService.leftPad(1, 4);
                //console.log('new reg no = ', this.newRegNo);
            }
        );
    }

    createVisit(diagReg: DiagReg) {
        //console.log('create visit , DiagReg = ', diagReg);
        this.regisService.insertDiagReg(diagReg).subscribe(
            data => JSON.stringify(data), // put the data returned from the server in our variable
            error => console.log(error), // in case of failure show this message
            () => { alert('บันทึกข้อมูลเรียบร้อย หมายเลข visit: ' + diagReg.regno); }
        );
    }

    selectRoom(room: any) {
        this.resetStRoom();
        this.currentRoom = room.col;
        if (room.col == 'stdiag') { this.visitForm.patchValue({ stdiag: 2 }) }
        if (room.col == 'stlr') { this.visitForm.patchValue({ stlr: 2 }) }
        if (room.col == 'stdent') { this.visitForm.patchValue({ stdent: 2 }) }
        if (room.col == 'sthp') { this.visitForm.patchValue({ sthp: 2 }) }
        if (room.col == 'ster') { this.visitForm.patchValue({ ster: 2 }) }
        if (room.col == 'stor') { this.visitForm.patchValue({ stor: 2 }) }
        if (room.col == 'stspclinic') { this.visitForm.patchValue({ stspclinic: 2 }) }
        if (room.col == 'stlab') { this.visitForm.patchValue({ stlab: 2 }) }
        if (room.col == 'stcmdoc') { this.visitForm.patchValue({ stcmdoc: 2 }) }
        if (room.col == 'stxray') { this.visitForm.patchValue({ stxray: 2 }) }
        if (room.col == 'stherbal') { this.visitForm.patchValue({ stherbal: 2 }) }
        if (room.col == 'stherbal1') { this.visitForm.patchValue({ stherbal1: 2 }) }
        if (room.col == 'stherbal2') { this.visitForm.patchValue({ stherbal2: 2 }) }
        if (room.col == 'stccc') { this.visitForm.patchValue({ stccc: 2 }) }
        if (room.col == 'stsanita') { this.visitForm.patchValue({ stsanita: 2 }) }
    }

}
