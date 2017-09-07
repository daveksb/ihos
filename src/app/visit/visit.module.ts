import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DiagModule } from '../diag/diag.module';
import { VitalsignModule } from '../vitalsign/vitalsign.module';
import { OperaionModule } from '../operation/operation.module';
import { PatientModule } from '../patient/patient.module';

import { VisitComponent } from './visit.component';

import { VisitService } from './visit.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DiagModule,
        OperaionModule,
        VitalsignModule,
        PatientModule
    ],
    declarations: [VisitComponent],
    providers: [VisitService]
})
export class VisitModule { }
