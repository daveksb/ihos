import { Component } from '@angular/core';

@Component({
    selector: 'gen-home',
    templateUrl: './gen-home.component.html',
})

export class GenHomeComponent {

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
