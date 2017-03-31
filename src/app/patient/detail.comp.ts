import { Component, Input } from '@angular/core';
import { PatientService } from './patient.service';

@Component({
  selector: 'patient-detail',
  templateUrl: './detail.comp.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientDetailComp {

  @Input() regno: string;

  diagReg: any;

  constructor(private _service: PatientService) {

    this._service.getDiagreg(this.regno).subscribe(val => this.diagReg = val);

  }

}
