import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'items-modal',
    templateUrl: './gen-modal.component.html',
})

export class ItemsModal {

    @Input() data: Object[];
    @Input() modalId: string;
    @Output() selectedItem = new EventEmitter();

    constructor() { }

    itemClick(item) {
        this.selectedItem.emit(item);
    }

}
