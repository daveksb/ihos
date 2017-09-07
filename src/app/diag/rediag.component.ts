import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-rediag',
    templateUrl: './rediag.component.html',
})

export class RediagComponent {

    @Input() diagHistory: any;
    //@Output() selectedItem = new EventEmitter();    

    constructor() { }

    itemClick(item) {
        //this.selectedItem.emit(item);
    }

}
