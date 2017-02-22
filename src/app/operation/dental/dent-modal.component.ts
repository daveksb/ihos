import { Component, Output, EventEmitter } from '@angular/core';
import { DentalService } from './dental.service';

@Component({
    selector: 'dent-modal',
    templateUrl: './dent-modal.component.html',
})

export class DentModal {

    @Output() selectedItem = new EventEmitter();

    dentCode: any;
    mainCode: string[];
    subCode: string[];

    private dentArray = [];

    constructor(private _service: DentalService) { }

    dentTypes: Object[] = [
        { "name": 'Xray', "code": "02", "sub": "Prostics" },
        { "name": 'Med', "code": "03", "sub": "xx" },
        { "name": 'อุด', "code": "04", "sub": "xx" },
        { "name": 'RCT', "code": "05", "sub": "xx" },
        { "name": 'ปริทันต์', "code": "06", "sub": "xx" },
        { "name": 'ป้องกัน', "code": "07", "sub": "xx" },
        { "name": 'เด็ก', "code": "08", "sub": "xx" },
        { "name": 'ฟันปลอม', "code": "09", "sub": "xx" },
        { "name": 'ถอนฟัน', "code": "10", "sub": "xx" },
        { "name": 'ศัลย์', "code": "11", "sub": "xx" }
    ];

    /*    selMainCode(id: string) {
            this.dentArray = [];
            this._service.getDentMain(id)
                .map(data => data.code.substr(0, 4))
                .subscribe(  // สร้างเมนู sub ขึ้นมา
                val => {
                    this.dentArray.push(val);
                    this.mainCode = this.remove_duplicates(this.dentArray);
                }
                );
    
            this._service.getDentSub(id).subscribe( // สร้าง list subCode ขึ้นมา
                val => { this.subCode = val }
            );
        }
    */

    selMainCode(id: string) {
        this.dentArray = [];
        this._service.getDentMain(id)
            //.map(res => res.code.substr(0, 4)) // ** เรา map ใน component ทั้งๆที่ best practice แนะนำให้ map ใน service แล้วค่อยมา subscribe ใน component เท่านั้น
            // เพราะ default ของ observable เป็น cold ดังนั้นคำสั่ง map นี้จะยังไม่ถูกรันใน service จนกว่าจะมีการ subscribe และเกิด error
            .subscribe(  // สร้างเมนู sub ขึ้นมา
            val => {
                this.dentArray.push(val);
                this.mainCode = this.remove_duplicates(this.dentArray);
            }
            );

        this._service.getDentSub(id).subscribe( // สร้าง list subCode ขึ้นมา
            val => { this.subCode = val }
        );
    }

    selSubCode(id: string) {
        this._service.getDentSub(id).subscribe(
            val => { this.subCode = val }
        );
    }

    itemClick(item) {
        this.selectedItem.emit(item);
    }

    remove_duplicates(arr) {
        let obj = {}; for (let i = 0; i < arr.length; i++) { obj[arr[i]] = true; }
        arr = []; for (let key in obj) { arr.push(key); } return arr;
    }

}
