import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-ng2/main';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/primeng';

import { ReportICD10tmComp } from './report-icd10tm.comp';
import { ReportGeoComp } from './report-geo.comp';
import { ReportAgeComp } from './report-age.comp';
import { ReportService } from './report.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    //AgGridModule.withNg2ComponentSupport()
    AgGridModule.withComponents([]),
  ],
  declarations: [ReportICD10tmComp, ReportGeoComp, ReportAgeComp],
  exports: [ReportICD10tmComp, ReportGeoComp, ReportAgeComp],
  providers: [ReportService]
})
export class ReportModule { }
