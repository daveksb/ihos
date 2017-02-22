import { Component, OnInit } from '@angular/core';
import { SearchPatientComp } from '../share/component/search.comp';
import { ReportService } from './report.service';


@Component({
    selector: 'report-lab',
    templateUrl: 'report-lab.comp.html'
})
export class ReportLabComponent implements OnInit {

    labRecord: any;

    constructor(private repService: ReportService) { }

    ngOnInit() { }

    patientChanged(patient: any) {

        console.log('call pt change patient = ', patient);

        this.repService.getReportLab(patient.hn).subscribe(res => this.labRecord = res);

        console.log('lab Record = ', this.labRecord);
    }
}