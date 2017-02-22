import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule, SharedModule, DialogModule, ConfirmDialogModule, GrowlModule } from 'primeng/primeng';

import { SearchPatientComp } from '../share/component/search.comp';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DialogModule, DataTableModule, SharedModule, ConfirmDialogModule, GrowlModule
    ],
    exports: [SearchPatientComp],
    declarations: [SearchPatientComp]
})
export class ShareModule { }
