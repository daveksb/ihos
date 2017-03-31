import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule, DataTableModule, SharedModule, DialogModule, ConfirmDialogModule, GrowlModule } from 'primeng/primeng';
import { MyShareModule } from '../share/share.module';

//import { ReportICD10tmComp } from './report-icd10tm.comp';
import { ReportLabComponent } from './report-lab.comp';
//import { ReportGeoComp } from './report-geo.comp';
//import { ReportAgeComp } from './report-age.comp';
import { ReportService } from './report.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule, DialogModule, DataTableModule, SharedModule, ConfirmDialogModule, GrowlModule,
    MyShareModule
  ],
  declarations: [ReportLabComponent],
  providers: [ReportService]
})
export class ReportModule { }
