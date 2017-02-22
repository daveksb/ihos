import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { GeneralService } from './general.service';
import { ItemsModal } from './gen-modal.component';
import { ItemObj } from '../item.model';

@Component({
    selector: 'gen-edit',
    templateUrl: './gen-edit.component.html',
    styleUrls: ['./gen-edit.component.css']
})

export class GenEditComponent implements OnChanges {

    @Output() submitForm = new EventEmitter();
    @Input() dentItem: ItemObj;  // input send from Dent

    temp: any;

    modal1: string = "modal1";
    modal2: string = "modal2";

    items: Object[];
    icd9s: Object[];

    subRoom: ItemObj = { code: 'cephalo', name: '', qty: 0, price1: 0, icd9code: '' };
    icd9Sub: Object = { code: "re", name: "", type: 1 };

    constructor(private _service: GeneralService) { }

    ngOnChanges() {
        console.log('dentItem=', this.dentItem);
        //this.subRoom = this.dentItem;
        // เฉพาะเมื่อมีการรับค่า input ที่ชื่อ dentItem เข้ามาจึงจะทำคำสั่งใน fn นี้
        //this.subRoom.qty = 1;
        //console.log('subroom.icd9code=', this.subRoom.icd9code);
        if (this.subRoom.icd9code) {
            this.findIcd9(this.subRoom.icd9code);
        }
    }

    // การ fill ข้อมูลลงแบบฟอร์ม Edit มี 2 กรณีคือ
    // 1. กดเลือก item มาจาก modal (ngOnChanges)
    // 2. dentItem ถูกส่งเข้ามาทาง Input (itemSelect)

    itemSelect(item) {
        this.subRoom = item;
        //this.subRoom.qty = 1;
        //console.log('subroom.icd9code=', this.subRoom.icd9code);
        if (this.subRoom.icd9code) {
            this.findIcd9(this.subRoom.icd9code);
        }
    }

    formSubmit(subRoom, icd9Sub) {
        this.submitForm.emit(true);
        this._service.pushSubRoomRec(subRoom);
    }

    cancel() {
        this.submitForm.emit(true);
    }

    findItems(term: string) {
        this._service.getItems(term).subscribe((result) => {
            this.items = result;
        });
    }

    findIcd9(term: string) {
        this.icd9Sub = this._service.getIcd9(term).subscribe((result) => {
            this.icd9Sub = result;
        });
    }

    findIcd9s(term: string) {
        this._service.getIcd9s(term).subscribe((result) => {
            this.icd9s = result;
            console.log('icd9s=', this.icd9s);
        });
    }

    icd9Select(item) {
        this.icd9Sub = item;
    }

}
