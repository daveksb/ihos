import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../app.config.interface';
import { RegisterService } from '../share/service/register.service';
import { SearchPatientService } from '../share/service/search.service';
import { Patient } from '../share/model/patient';
import { DiagReg } from '../share/model/diagreg';

import { SearchPatientComp } from '../share/component/search.comp';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import * as moment from 'moment';


@Component({
    selector: 'newvisit',
    templateUrl: 'newvisit.comp.html',
    styleUrls: ['./regis.css'],
})

export class NewVisitComp implements OnInit {

    curPath: any;
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
    currentRoom: string = 'stdiag';
    clock: any;
    officeHour: boolean;
    buttonNum = [{ min: -1, max: 3 }, { min: 2, max: 6 }, { min: 5, max: 9 }, { min: 8, max: 12 }, { min: 11, max: 15 }];

    msgs: Message[] = [];

    obs1: Observable<string[]>; // ผลลัพทธ์ การค้นหา
    obs2: Observable<string[]>;
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

        this.curPath = route.snapshot.params;

        this.obs1 = this.searchTermStream1.filter(x => x.length > 3).do(x => console.log('obs1:', x))
            .debounceTime(500).distinctUntilChanged().switchMap((term: string) => this.regisService.getHos(term));

        this.obs2 = this.searchTermStream2.filter(x => x.length > 3).do(x => console.log('obs2:', x))
            .debounceTime(500).distinctUntilChanged().switchMap((term: string) => this.regisService.getHos(term));

        const res = route.snapshot.routeConfig.path
        console.log('res = ', res);

    }

    ngOnInit() {
        this.createRegNo();
        this.initForm();

        //เฉพาะ กรณี ระบุ hn มาใน url
        if (this.curPath.hn) {
            //console.log('cur path =', this.curPath.hn);
            this.searchService.getPatient(this.curPath.hn)
                .subscribe(res => { this.patientChanged(res) })
        }

        this.isOfficeHour();
        this.obs1.subscribe(val => this.hos1List = val);  // ดักรอค่า hos1List
        this.obs2.subscribe(val => this.hos2List = val);
        this.clock = Observable.interval(1000).map(() => new Date());
        this.rooms = this.regisService.roomList;
        this.regisService.getTable('socials').subscribe(res => this.classList = res);  //สิทธิ์
        this.regisService.getTable('nations').subscribe(res => this.nationList = res);  //สัญชาติ - เชื้อชาติ
        this.regisService.getTable('occupats').subscribe(res => this.occupaList = res);  //สัญชาติ - เชื้อชาติ
    }

    editPatient() {
        this.router.navigate(['/edit-patient', this.tempPatient.hn]);
    }

    searchHos1(term: string) {
        this.searchTermStream1.next(term)
        this.visitForm.patchValue({ hos1: term }); //กำหนดค่าให้ drop down hos1
        /*
                if (term.length > 3) {
                    this.searchTermStream1.next(term);
                }
        */
    } // function ที่รับ string แล้วสร้าง observable ใหม่ขึ้นมา

    searchHos2(term: string) {
        this.searchTermStream2.next(term);
        this.visitForm.patchValue({ hos2: term }); //กำหนดค่าให้ drop down hos1
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
            age: null, room: '00', count: 0, typedate: null,
            insureCard: null, insureBdate: null, insureEdate: null,
            hos1: null, hos2: null, date: null, time: null, class: null,
            refer: 99, stpatient: 1, stdiag: 1, stspclinic: 1, stsanita: 1,
            stdent: 1, sthp: 1, stlr: 1, ster: 1, stxray: 1, stlab: 1, stadmit: 1, stor: 1,
            stherbal: 1, stdrug: 1, stpay: 1, stopd: 1, stdrg: 1, stdrger: 1, stdead: 1,
            stadiag: 1, stobs: 1, stfree: 1, stherbal2: 1, stccc: 1, stpcard: 1, stclass: null
        });
    }

    resetStRoom() {
        this.visitForm.patchValue({
            stdiag: 1, stlr: 1, stdent: 1, sthp: 1, ster: 1,
            stor: 1, stspclinic: 1, stlab: 1, stcmdoc: 1, stxray: 1,
            stherbal: 1, stherbal1: 1, stherbal2: 1, stccc: 1, stsanita: 1,
        })
    }

    getAge(bd) {
        let today = new Date();
        let birthDate = new Date(bd);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
        //console.log('age = ', age);
        return age;
    }

    classChanged(input) {
        let val = _.filter(this.classList, { 'code': input })
        this.visitForm.patchValue({ stclass: val[0].type });
    }

    printOpd() {

        this.tempPatient.nationTH = this.index2string(this.tempPatient.nation, 'nation');
        this.tempPatient.raceTH = this.index2string(this.tempPatient.race, 'nation');
        this.tempPatient.occupaTH = this.index2string(this.tempPatient.occupa, 'occupa');
        this.tempPatient.classTH = this.index2string(this.tempPatient.class, 'class');
        this.tempPatient.todayTH = this.regisService.en2thdate(new Date());

        this.regisService.opdCard(this.tempPatient).subscribe(res => { });
        setTimeout(() => { window.open(this.config.serverIP + 'opdcard.docx', '_blank'); }, 350);
    }

    printPrescription() {

        this.tempPatient.classTH = this.index2string(this.tempPatient.class, 'class');
        this.tempPatient.todayTH = this.regisService.en2thdate(new Date());
        this.regisService.prescription(this.tempPatient).subscribe(res => { });

        setTimeout(() => { window.open(this.config.serverIP + 'prescription.docx', '_blank'); }, 350);
    }

    index2string(value, type) {
        let temp = [{ name: '' }];
        if (type == 'nation') { temp = _.filter(this.nationList, { 'code': value }) }
        if (type == 'occupa') { temp = _.filter(this.occupaList, { 'code': value }) }
        if (type == 'class') { temp = _.filter(this.classList, { 'code': value }) }

        let result = temp[0].name;
        //console.log(type, ':', temp);
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
        this.tempPatient.age = this.getAge(patient.birthday);

        this.visitForm.patchValue({
            regno: this.newRegNo,
            qno: this.newQ,
            hn: patient.hn,
            count: patient.count + 1,
            typedate: this.isOfficeHour(),
            titles: patient.titles,
            name: patient.name,
            surname: patient.surname,
            age: this.tempPatient.age,
            date: new Date(),
            class: patient.class,
            insureCard: patient.insureCard,
            hos1: patient.hos1,
            hos2: patient.hos2,
            time: new Date().toTimeString().slice(0, 8), //เอาแค่ 8 ตัวแรก ถ้าเกินจะเกิด error
        });
        //console.log('Patient = ', patient);
        //console.log('current room = ', this.currentRoom);
        //console.log('regno = ', this.visitForm.controls['regno'].valid);
    }

    createRegNo() {
        //console.log('call : create regno ');
        //let temp = new Date().toLocaleDateString([], { month: "2-digit", day: "2-digit" });

        let temp = moment().format("MM-DD");
        //console.log('temp =', temp);

        this.regisService.getLastQue().subscribe(
            data => {
                if (data === null) { // กรณีวันนั้น ไม่มี que ก่อนหน้า
                    this.newQ = 1;
                    this.newRegNo = '60-' + temp + '-' + this.regisService.leftPad(1, 4);
                    console.log('NULL new reg no = ', this.newRegNo);

                } else {  // กรณีวันนั้น มี que ก่อนหน้า

                    let newQ = data.qno + 1;
                    let result = '60-' + temp + '-' + this.regisService.leftPad(newQ, 4);
                    console.log('Not NULL new reg no = ', result);
                    this.newRegNo = result;
                    this.newQ = newQ;
                }
            }
        );
    }

    resetPatient() {
        this.visitForm.reset();
        this.tempPatient = new Patient('');
        this.tempPatient.insBdateTH = '';
        this.tempPatient.insEdateTH = '';
        this.tempPatient.lastdateTH = '';
    }

    createVisit(diagReg: DiagReg) {
        console.log('create visit , DiagReg = ', diagReg);
        this.regisService.insertDiagReg(diagReg).subscribe(
            data => {
                JSON.stringify(data);
                this.createRegNo();
                this.resetPatient()
                this.msgs.push({ severity: 'info', summary: 'บันทึกข้อมูลเรียบร้อย', detail: 'หมายเลข Visit: ' + diagReg.regno });
                setTimeout(() => { this.router.navigate(['patient-list']); }, 2000);
            },
            error => { alert(error) },
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
