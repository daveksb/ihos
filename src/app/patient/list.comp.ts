import { Component, NgZone, OnInit, Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from './patient.service';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../app.config.interface';
import { PeriodPipe } from './period.pipe'

@Component({
  selector: 'patient-list',
  templateUrl: './list.comp.html'
})
export class PatientListComp implements OnInit {

  diagRegs: any;

  constructor(
    @Inject(APP_CONFIG)
    private config: IAppConfig,
    private zone: NgZone,
    private router: Router,
    private _service: PatientService) {

    const EventSource: any = window['EventSource'];
    const fx = new EventSource(this.config.apiEndpoint + 'diagregs/change-stream?_format=event-stream&access_token=' + localStorage.getItem('token'));
    fx.addEventListener("data",
      msg => {
        //console.log('msg =', msg);
        let input = JSON.parse(msg.data);
        zone.run(() => { this.diagRegs.unshift(input.data) })
      }
    );

  }

  ngOnInit() {
    this._service.getPatients('abd').subscribe(
      val => this.diagRegs = val
    )
  }

  goToVisit(patient: any): void {
    console.log('patient = ', patient);
    let link = ['/visit', patient.regno];
    this.router.navigate(link);
  }

}
