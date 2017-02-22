import { Component } from '@angular/core';
import { DentModal } from './dent-modal.component';
import { ItemObj } from '../item.model';

@Component({
    selector: 'dent-home',
    templateUrl: './dent-home.component.html',
})

export class DentHomeComponent {

    listMode: Boolean = true;
    editMode: Boolean = false;
    dentItem: ItemObj;

    constructor() { }

    returnListMode() {
        this.listMode = true;
        this.editMode = false;
    }

    returnEditMode() {
        this.listMode = false;
        this.editMode = true;
    }

    itemSelect(item) {
        this.returnEditMode();
        this.dentItem = item;
    }

}
