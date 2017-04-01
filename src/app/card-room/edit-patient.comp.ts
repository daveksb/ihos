import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmationService, Message } from 'primeng/primeng';

import { CardRoomService } from './card-room.service';
import { Patient } from '../share/model/patient';

import { RegisterComp } from './register.comp';

@Component({
    templateUrl: 'register.comp.html',
    styleUrls: ['./card-room.css'],
})
export class EditPatientComp extends RegisterComp {

    curHn: string;

    constructor(
        router: Router,
        route: ActivatedRoute,
        regService: CardRoomService,
        _fb: FormBuilder,
        confirmService: ConfirmationService) {

        super(router, route, regService, _fb, confirmService)
    }

    ngAfterViewInit() { // ไมใช้ ngOnInit เพราะจะไปทำให้ ngOnInit ของ Base ไม่ทำงาน จึงเลี่ยงมาใช้ ngAfterViewInit แทน

        //console.log('titleSex = ', this.titleSex);
        this.route.params.subscribe(params => {
            // เฉพาะเมื่อมีค่า hn ส่งมาทาง url จึงทำส่วนนี้                    
            this.regService.getPatient(params['hn']).subscribe(
                res => {
                    //console.log('get patient = ', res)
                    this.curHn = res.hn;
                    // กำหนด dropdown list ให้ ้hosList สำหรับค่าเริ่มต้น คือเรามีค่าแล้วจากด้านล่างแต่ dropdown ก็ต้องมีค่าด้วย จึงจะมองเห็น
                    this.regService.loadHos(res.hos1).subscribe(res => { this.hos1List = res; });
                    this.regService.loadHos(res.hos2).subscribe(res => { this.hos2List = res; });

                    // กำหนด dropdown list ให้ ampur และ tambon เฉพาะกรณี edit , หากเป็นกรณี add เราจะ default ให้เป็น 36000
                    this.regService.getAmpurByProvince(res.province).subscribe(val => this.ampurList = val);
                    this.regService.getTambonByAmpur(res.ampur).subscribe(val => this.tambonList = val);

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


    confirmEdit(regisForm: Patient) {
        this.confirmService.confirm({
            message: 'ยืนยัน แก้ไขข้อมูลผู้ป่วย ?',
            /*            accept: () => {
                            this.regService.updatePatient(regisForm).subscribe(() => {
                                this.alertMsg.push({ severity: 'warn', summary: 'บันทึกข้อมูลเรียบร้อย', detail: 'หมายเลข HN: ' + regisForm.hn });
                                setTimeout(() => { this.router.navigate(['newvisit', { hn: this.curHn }]); }, 2000);  // redirect ไปยังหน้า ลงทะเบียน
                            });
            
                        }*/
        });
    }


}
