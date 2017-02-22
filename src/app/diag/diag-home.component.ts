import { Component } from '@angular/core';

@Component({
    selector: 'diag-home',
    templateUrl: './diag-home.component.html',
})

export class DiagHomeComponent {

    listMode: Boolean = false;
    editMode: Boolean = true;

    constructor() { }

    toggleMode() {
        this.listMode = !this.listMode;
        this.editMode = !this.editMode;
    }

    returnListMode() {
        this.listMode = true;
        this.editMode = false;
    }

}
