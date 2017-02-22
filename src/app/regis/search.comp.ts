import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchPatientService } from '../share/service/search.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'search-patient',
    templateUrl: 'search.comp.html',
    providers: [SearchPatientService]
})

export class SearchPatientComp {

    @Input() name: string;
    @Output() patientWasSelect: EventEmitter<any> = new EventEmitter<any>();

    items: Observable<string[]>; // ผลลัพทธ์ การค้นหา    
    private searchTermStream = new Subject<string>(); // stream ที่สร้างจาก input ของเรา    

    patients: any;
    keyword: any = '234';
    showDialog: boolean = false;

    onSelect(patient: any) {
        this.patientWasSelect.emit(patient.data)
        this.patients = [];
        this.showDialog = false;
    }

    constructor(private searchService: SearchPatientService) {
        this.items = this.searchTermStream.debounceTime(700).distinctUntilChanged().switchMap((term: string) => this.searchService.getPatients(term));
        this.items.subscribe(
            val => this.patients = val,
        );
    }

    obsSearch(term: string) {
        if (term.length > 3) {
            this.searchTermStream.next(term);
        }
    }

    searchPatients() {
        this.showDialog = true;
        this.searchService.getPatients(this.keyword).subscribe(
            data => this.patients = data,
            error => alert(error)
        );
    }

    clearPatients() {
        this.patients = [];
        this.keyword = '';
    }

}
