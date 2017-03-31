import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';

@Component({
    templateUrl: 'test.html'
})
export class TestComp {

    constructor(
        private confirmService: ConfirmationService
    ) { }

    confirmSw() {
        this.confirmService.confirm({
            message: 'บันทึกข้อมูลส่งตรวจ ?',
            //accept: () => { this.createVisit(formValue) }
        });
    }

}