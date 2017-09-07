import { Component, Output, EventEmitter } from '@angular/core';
import { DiagService } from './diag.service';
import { DiagEditModal } from './diag-edit-modal.component';

@Component({
    selector: 'diag-edit',
    templateUrl: './diag-edit.component.html',
    styleUrls: ['./diag-edit.component.css'],
})

export class DiagEditComponent {

    icd101s: any;
    icd10Sub: any; //Object = { code: '', name: '', text: '', type: 0 };
    @Output() submitForm = new EventEmitter();

    constructor(private _service: DiagService) { }

    findIcd10s(term: string) {
        this._service.getICD10(term).subscribe((result) => {
            this.icd101s = result;
        });
    }

    itemSelect(item) {
        this.icd10Sub = item;
        console.log('icd10sub =', this.icd10Sub);
    }

    diagEditSubmit(items) {
        //console.log('diagEditSubmit Call , items = ', items)
        this._service.pushDiags(items);
        this.submitForm.emit(true);
    }
    cancel() {
        this.submitForm.emit(true);
    }

}
