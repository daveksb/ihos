import { Component, OnInit } from '@angular/core';
import { DentalService } from './dental.service';

@Component({
    selector: 'dent-list',
    templateUrl: './dent-list.component.html',
})
export class DentListComponent implements OnInit {

    temp: any;

    constructor(private _service: DentalService) { }

    ngOnInit() {
        this.temp = this._service.getSubRoomArray()
    }

    delRow(index) {
        this._service.delSubRoomArray(index);
    }
}
