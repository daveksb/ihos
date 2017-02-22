import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTableModule, SharedModule, DialogModule, InputMaskModule, ConfirmDialogModule, GrowlModule } from 'primeng/primeng';

import { RegisterComp } from './register.comp';
import { EditPatientComp } from './edit-patient.comp';
import { NewVisitComp } from './newvisit.comp';
import { SearchPatientComp } from './search.comp';
import { RegisterService } from '../share/service/register.service';
import { SearchPatientService } from '../share/service/search.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule, DialogModule, DataTableModule, SharedModule, ConfirmDialogModule, GrowlModule
  ],
  declarations: [RegisterComp, EditPatientComp, NewVisitComp, SearchPatientComp],
  exports: [RegisterComp, NewVisitComp, SearchPatientComp],
  providers: [RegisterService, SearchPatientService]
})
export class RegisterModule { }
