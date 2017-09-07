import { Component, OnInit } from '@angular/core';
import { DiagService } from './diag.service';

@Component({
    selector: 'diag-list',
    templateUrl: './diag-list.component.html',
})
export class DiagListComponent implements OnInit {

    temp: any;

    constructor(private diagService: DiagService) { }

    ngOnInit() {
        this.temp = this.diagService.getDiags();
        console.log('diag list =', this.temp);
    }

    delRow(index) {
        this.diagService.delDiag(index);
    }

}
