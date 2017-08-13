import { Component, OnInit, Input } from '@angular/core';
import { VitalsignService } from './vitalsign.service';


@Component({
    selector: 'vital-sign',
    templateUrl: './vitalsign.component.html',
    styleUrls: ['./vitalsign.component.css'],
    providers: [VitalsignService]
})
export class VitalsignComponent implements OnInit {

    @Input() regno: string;

    vitalsign: Object = {};

    constructor(private _service: VitalsignService) { }

    ngOnInit() {
        //console.log('regno 77 =', this.regno);
        this._service.getDiagNote(this.regno).subscribe(val => this.vitalsign = val);
    }

}
