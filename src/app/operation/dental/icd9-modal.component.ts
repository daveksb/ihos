import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'icd9-modal',
    templateUrl: './icd9-modal.component.html',
})

export class DentIcd9Modal {

    @Input() data: Object[];
    @Input() modalId: string;
    @Output() selectedItem = new EventEmitter();

    constructor() { }

    itemClick(item) {
        this.selectedItem.emit(item);
    }

}
