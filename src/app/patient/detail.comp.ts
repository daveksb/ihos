import { Component, Input, OnInit, } from '@angular/core';
import { PatientService } from './patient.service';

@Component({
  selector: 'patient-detail',
  templateUrl: './detail.comp.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientDetailComp implements OnInit {

  @Input() regno: any;

  diagReg: any;

  constructor(private _service: PatientService) {
  }

  ngOnInit() {
    this._service.getDiagreg(this.regno).subscribe(val => this.diagReg = val);
  }

}
