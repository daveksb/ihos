import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTableModule, SharedModule, DialogModule, InputMaskModule, ConfirmDialogModule, GrowlModule, MessagesModule } from 'primeng/primeng';
import { ShareModule } from '../share/share.module';

import { RegisterComp } from './register.comp';
import { EditPatientComp } from './edit-patient.comp';
import { NewVisitComp } from './newvisit.comp';
import { RegisterService } from '../share/service/register.service';
import { SearchPatientService } from '../share/service/search.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule, DialogModule, DataTableModule, SharedModule, ConfirmDialogModule, GrowlModule, MessagesModule,
    ShareModule
  ],
  declarations: [RegisterComp, EditPatientComp, NewVisitComp],
  exports: [RegisterComp, NewVisitComp],
  providers: [RegisterService, SearchPatientService]
})
export class RegisterModule { }
