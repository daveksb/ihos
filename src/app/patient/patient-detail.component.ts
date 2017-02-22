import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from './patient.service';

@Component({
  selector: 'patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientDetailComponent implements OnInit {

  @Input() regno: string;

  diagReg: any;

  constructor(private _service: PatientService) { }

  ngOnInit() {

    this._service.getDiagreg(this.regno).subscribe(val => this.diagReg = val);

  }

}
