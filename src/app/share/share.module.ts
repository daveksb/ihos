import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule, DialogModule } from 'primeng/primeng';

import { SearchPatientComp } from './search.comp';
import { SearchPatientService } from './search.service';
import { ConfirmationService } from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DialogModule, DataTableModule
    ],
    exports: [SearchPatientComp],
    declarations: [SearchPatientComp]
})
export class MyShareModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MyShareModule,
            providers: [SearchPatientService, ConfirmationService]
        };
    }

}
