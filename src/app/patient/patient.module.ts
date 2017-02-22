import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientListComponent } from './patient-list.component';
import { PatientService } from './patient.service';
import { PeriodPipe } from './period.pipe'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PatientDetailComponent, PatientListComponent, PeriodPipe],
  exports: [PatientDetailComponent, PatientListComponent],
  providers: [PatientService]
})
export class PatientModule { }
