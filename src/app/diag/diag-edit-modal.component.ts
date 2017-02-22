import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'diag-edit-modal',
    templateUrl: './diag-edit-modal.component.html',
})

export class DiagEditModal {

    @Input() diagList: Object[];
    @Output() selectedItem = new EventEmitter();

    constructor() { }

    itemClick(item) {
        this.selectedItem.emit(item);
    }

}
