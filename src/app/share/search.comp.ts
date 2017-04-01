import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchPatientService } from './search.service';

@Component({
    selector: 'search-patient',
    templateUrl: 'search.comp.html',
})

export class SearchPatientComp {

    @Input() name: string;
    @Output() patientWasSelect: EventEmitter<any> = new EventEmitter<any>();

    patients: any;
    showDialog: boolean = false;

    constructor(private searchService: SearchPatientService) { }

    onSelect(patient: any) {
        this.patientWasSelect.emit(patient.data);
        this.showDialog = false;
    }

    searchPatients(input) {
        this.showDialog = true;
        this.patients = this.searchService.getPatients(input);
    }

}
