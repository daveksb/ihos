import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CardRoomService } from './card-room.service';
import { Patient } from '../share/model/patient';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConfirmationService, Message } from 'primeng/primeng';

@Component({
    templateUrl: 'register.comp.html',
    styleUrls: ['./card-room.css'],
})
export class RegisterComp implements OnInit {

    regisForm: FormGroup;
    curPath: string;
    newHN: string;
    titlesList = [];
    titleSex: any;//Object = { Sex: '', TName: '' };
    provinceList = [];
    ampurList = [];
    tambonList = [];
    occupatList = [];
    nationList = [];
    classList = [];
    hos1List = [];
    hos2List = [];
    birthday: string = '';
    insBdate: string = '';
    insEdate: string = '';
    pvName: string = 'ชัยภูมิ';
    apName: string = 'หนองบัวระเหว';
    tbName: string = 'หนองบัวระเหว';
    alertMsg: Message[] = [];

    items1: Observable<string[]>; // ผลลัพทธ์ การค้นหา
    items2: Observable<string[]>;
    private searchTermStream1 = new Subject<string>(); // stream ที่สร้างจาก input ของเรา
    private searchTermStream2 = new Subject<string>(); // stream ที่สร้างจาก input ของเรา

    constructor(

        protected router: Router, protected route: ActivatedRoute,
        protected regService: CardRoomService, protected _fb: FormBuilder,
        protected confirmService: ConfirmationService) {

        this.curPath = route.snapshot.routeConfig.path;
        //console.log('current path = ', this.curPath);

        this.items1 = this.searchTermStream1.debounceTime(300).distinctUntilChanged().switchMap((term: string) => this.regService.getHos(term));
        this.items2 = this.searchTermStream2.debounceTime(300).distinctUntilChanged().switchMap((term: string) => this.regService.getHos(term));

        this.regisForm = this._fb.group({
            titles: null, name: [null, Validators.required],
            surname: [null, Validators.required],
            sex: null, blood: 'AB', birthday: null,
            age: null, addr: '', moo: '', province: '360000', ampur: '360800', tambon: '360801',
            phone: '', father: '', mother: '', drughyper: 'ไม่ทราบประวัติแพ้ยา', contact: '',
            addrContact: '', phoneContact: '', class: '', personId: '', marriage: '',
            occupa: '', nation: '01', race: '01', insureCard: '', insureBdate: null, insureEdate: null,
            hos1: '', hos2: '', note: '', hn: this.newHN, lastdate: this.regService.getTime()
        });
    }

    ngOnInit() {
        this.items1.subscribe(val => this.hos1List = val);  // ดักรอค่า hos1List
        this.items2.subscribe(val => this.hos2List = val);
        this.regService.getTable('Titles').subscribe(val => this.titlesList = val);
        this.regService.getTable('LProvs').subscribe(val => this.provinceList = val);
        this.regService.getAmpurByProvince('360000').subscribe(val => this.ampurList = val);
        this.regService.getTambonByAmpur('360800').subscribe(val => this.tambonList = val);
        this.regService.getTable('Occupats').subscribe(val => this.occupatList = val);
        this.regService.getTable('nations').subscribe(val => this.nationList = val);
        this.regService.getTable('socials').subscribe(val => this.classList = val);
        this.regService.getLastHN().subscribe(val => {
            let tempHN = val.hn.split("/");
            let numhn: number = parseInt(tempHN[0]) + 1;
            this.newHN = numhn + '/60';
            //console.log('newHN=', this.newHN);
            this.regisForm.controls['hn'].setValue(this.newHN);
        });
    }

    confirmAdd(regisForm: Patient) {
        this.confirmService.confirm({
            message: 'บันทึกข้อมูลผู้ป่วยใหม่ ?',
            accept: () => { //console.log('regisForm= ', regisForm);
                this.regService.createPatient(regisForm).subscribe(() => {
                    this.alertMsg.push({ severity: 'warn', summary: 'บันทึกข้อมูลเรียบร้อย', detail: 'หมายเลข HN: ' + regisForm.hn });
                    setTimeout(() => { this.router.navigate(['card-room/visit', { hn: regisForm.hn }]); }, 3000);  // redirect ไปยังหน้า ลงทะเบียน
                });
            }
        });
    }

    fillSurname(event, targetInput) {
        //console.log(event.key, event.keyCode);
        let val = this.regisForm.controls[targetInput].value + this.regisForm.controls['surname'].value
        if (targetInput == 'father') { this.regisForm.patchValue({ father: val }); }
        if (targetInput == 'mother') { this.regisForm.patchValue({ mother: val }); }
    }

    fillAddrContact() {
        let val = this.regisForm.controls['addr'].value + ' หมู่ ' + this.regisForm.controls['moo'].value +
            ' ต.' + this.tbName + ' อ.' + this.apName + ' จ.' + this.pvName;
        this.regisForm.patchValue({ addrContact: val });
    }

    searchHos1(term: string) {
        if (term.length > 3) {
            this.searchTermStream1.next(term);
            this.regisForm.patchValue({ hos1: term }); //กำหนดค่าให้ drop down hos1
        }
    } // function ที่รับ string มา แล้วทำการสร้าง observable ใหม่ขึ้นมา

    searchHos2(term: string) {
        if (term.length > 3) {
            this.searchTermStream2.next(term);
            this.regisForm.patchValue({ hos2: term }); //กำหนดค่าให้ drop down hos1
        }
    }

    getAge() {
        let temp = this.birthday.split('-');
        let thDate = temp[1] + '-' + temp[0] + '-' + temp[2]; // สลับ เดือน <-> วันที่
        let bd = new Date(thDate);
        bd.setFullYear(bd.getFullYear() - 543); // แปลง พ.ศ. เป็ร ค.ศ.
        let ageDifMs = Date.now() - bd.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        let calcAge = Math.abs(ageDate.getUTCFullYear() - 1970);
        this.regisForm.patchValue({
            age: calcAge,
            birthday: bd,
        });
        //console.log('getAge was Called bd = ', bd);
    }

    getBdate() {
        let temp = this.insBdate.split('-');
        let thDate = temp[1] + '-' + temp[0] + '-' + temp[2]; // สลับ เดือน <-> วันที่
        let bd = new Date(thDate);
        bd.setFullYear(bd.getFullYear() - 543); // แปลง พ.ศ. เป็ร ค.ศ.        
        this.regisForm.patchValue({ insureBdate: bd });
        //console.log('getBdate was Called Bdate = ', bd);
    }

    getEdate() {
        let temp = this.insEdate.split('-');
        let thDate = temp[1] + '-' + temp[0] + '-' + temp[2]; // สลับ เดือน <-> วันที่
        let bd = new Date(thDate);
        bd.setFullYear(bd.getFullYear() - 543); // แปลง พ.ศ. เป็ร ค.ศ.        
        this.regisForm.patchValue({ insureEdate: bd });
        //console.log('getBdate was Called Bdate = ', bd);
    }

    provinceChanged(pvCode) {
        this.provinceList.filter(res => res.code == pvCode).map(res => this.pvName = res.name)
        this.regService.getAmpurByProvince(pvCode).subscribe(data => this.ampurList = data);
        this.tambonList = [];
    }

    ampurChanged(apCode) {
        this.ampurList.filter(res => res.code == apCode).map(res => this.apName = res.name)
        //console.log('ap change temp = ', temp);
        this.regService.getTambonByAmpur(apCode).subscribe(data => this.tambonList = data);
    }

    tambonChanged(tbCode) {
        this.tambonList.filter(res => res.code == tbCode).map(res => this.tbName = res.name)
        //console.log('this tbName = ', this.tbName);
    }

    titlesChanged() {
        //this.titleSex = val;
        console.log('tt sex  =', this.titleSex);
        this.regisForm.patchValue({
            sex: this.titleSex.sex.replace(" ", ""), // กำจัดช่องวางทั้งหมดออก    
            titles: this.titleSex.tname             // เนื่องจาก titles ใน form เราไม่ได้ ใช้ formControlname แต่ใช้ ngModel แทน และ รับ object แทนที่จะเป็น string
        });
    }

}
