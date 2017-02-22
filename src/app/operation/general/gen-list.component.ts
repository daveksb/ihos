import { Component, OnInit } from '@angular/core';
import { GeneralService } from './general.service';

@Component({
    selector: 'gen-list',
    templateUrl: './gen-list.component.html',
})
export class GenListComponent implements OnInit {

    temp: any;

    constructor(private _service: GeneralService) { }

    ngOnInit() {
        this.temp = this._service.getSubRoomArray()
    }

    delRow(index) {
        this._service.delSubRoomArray(index);
    }
}
