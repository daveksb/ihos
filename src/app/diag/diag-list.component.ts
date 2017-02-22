import { Component, OnInit } from '@angular/core';
import { DiagService } from './diag.service';

@Component({
    selector: 'diag-list',
    templateUrl: './diag-list.component.html',
})
export class DiagListComponent implements OnInit {

    temp: any;

    constructor(private _service: DiagService) { }

    ngOnInit() {
        this.temp = this._service.getDiags();
    }

    delRow(index) {
        this._service.delDiag(index);
    }

}
