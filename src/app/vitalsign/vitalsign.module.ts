import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VitalsignComponent } from './vitalsign.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [VitalsignComponent],
    exports: [VitalsignComponent]  // *****************************
})
export class VitalsignModule { }
