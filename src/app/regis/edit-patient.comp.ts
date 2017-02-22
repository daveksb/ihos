
import { Component, ViewChild, ElementRef } from '@angular/core';
import { RegisterComp } from './register.comp';
import { SearchPatientService } from '../share/service/search.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../share/service/register.service';
import { ConfirmationService, Message } from 'primeng/primeng';
//import { Patient } from '../share/model/patient';
//import { Observable } from 'rxjs/Observable';
//import { Subject } from 'rxjs/Subject';
//import * as _ from 'lodash';

@Component({
    templateUrl: 'register.comp.html',
    //templateUrl: 'edit-patient.comp.html',
    styleUrls: ['./regis.css'],
})
export class EditPatientComp extends RegisterComp {

    constructor(
        router: Router,
        route: ActivatedRoute,
        regService: RegisterService,
        _fb: FormBuilder,
        confirmationService: ConfirmationService,
        protected searchService: SearchPatientService) {

        //console.log('constructor of Child')
        super(router, route, regService, _fb, confirmationService)
    }

    ngAfterViewInit() { // ไมใช้ ngOnInit เพราะจะไปทำให้ ngOnInit ของ Base ไม่ทำงาน จึงเลี่ยงมาใช้ ngAfterViewInit แทน

        this.route.params.subscribe(params => {
            // เฉพาะเมื่อมีค่า hn ส่งมาทาง url จึงทำส่วนนี้                    
            this.searchService.getPatient(params['hn']).subscribe(
                res => {
                    console.log('get patient = ', res)

                    // กำหนด dropdown list ให้ ้hosList สำหรับค่าเริ่มต้น คือเรามีค่าแล้วจากด้านล่างแต่ dropdown ก็ต้องมีค่าด้วย จึงจะมองเห็น
                    this.regService.loadHos(res.hos1).subscribe(res => { this.hos1List = res; });
                    this.regService.loadHos(res.hos2).subscribe(res => { this.hos2List = res; });

                    // แปลง วัน เป็นรูปแบบไทย
                    this.birthday = this.regService.en2thdate(res.birthday);
                    this.insBdate = this.regService.en2thdate(res.insureBdate);
                    this.insEdate = this.regService.en2thdate(res.insureEdate);

                    this.regisForm.patchValue({
                        titles: res.titles,
                        name: res.name,
                        surname: res.surname,
                        sex: res.sex,
                        blood: res.blood,
                        birthday: res.birthday,
                        age: res.age,
                        addr: res.addr,
                        moo: res.moo,
                        province: res.province,
                        ampur: res.ampur,
                        tambon: res.tambon,
                        phone: res.phone,
                        father: res.father,
                        mother: res.mother,
                        drughyper: res.drughyper,
                        contact: res.contact,
                        addrContact: res.addrContact,
                        phoneContact: res.phoneContact,
                        class: res.class,
                        personId: res.personId,
                        marriage: res.marriage,
                        occupa: res.occupa,
                        nation: res.nation,
                        race: res.race,
                        insureCard: res.insureCard,
                        insureBdate: res.insureBdate,
                        insureEdate: res.insureEdate,
                        hos1: res.hos1,
                        hos2: res.hos2,
                        note: res.note,
                        hn: res.hn,
                        lastdate: res.lastdate
                    });
                }
            )
        });
    }

}
