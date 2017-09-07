import { Component, Output, EventEmitter } from '@angular/core';
import { DiagService } from './diag.service';
import { DiagEditModal } from './diag-edit-modal.component';
import { RediagComponent } from './rediag.component'

@Component({
    selector: 'diag-edit',
    templateUrl: './diag-edit.component.html',
    styleUrls: ['./diag-edit.component.css'],
})

export class DiagEditComponent {

    icd101s: any;
    icd10Sub: Object = { code: 'r2', name: '', text: '', type: 0, clinic: { name: '', code: '' } };
    userDiagHistory: any;

    @Output() submitForm = new EventEmitter();

    constructor(private _service: DiagService) {


    }

    findIcd10s(term: string) {
        this._service.getICD10(term).subscribe((result) => {
            this.icd101s = result;
        });
    }

    itemSelect(item) {
        this.icd10Sub = item;
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
