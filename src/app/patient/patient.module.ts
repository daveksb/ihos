import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient.routing';

import { PatientService } from './patient.service';
import { PeriodPipe } from './period.pipe'

import { PatientDetailComp } from './detail.comp';
import { PatientListComp } from './list.comp';

@NgModule({
  imports: [CommonModule, PatientRoutingModule],
  declarations: [PatientDetailComp, PatientListComp, PeriodPipe],
  exports: [PatientDetailComp, PatientListComp],
  providers: [PatientService]
})
export class PatientModule { }
