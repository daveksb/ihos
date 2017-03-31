import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTableModule, SharedModule, DialogModule, InputMaskModule, ConfirmDialogModule, GrowlModule, MessagesModule } from 'primeng/primeng';

import { RegisterRoutingModule } from './register.routing';
import { MyShareModule } from '../share/share.module';

import { RegisterComp } from './register.comp';
import { EditPatientComp } from './edit-patient.comp';
import { NewVisitComp } from './newvisit.comp';
import { TestComp } from './test.comp';

import { RegisterService } from './register.service';
import { SearchPatientService } from '../share/service/search.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    InputMaskModule, DialogModule, DataTableModule, SharedModule, ConfirmDialogModule, GrowlModule, MessagesModule,
    MyShareModule
  ],
  declarations: [TestComp, RegisterComp, EditPatientComp, NewVisitComp],
  exports: [RegisterComp, EditPatientComp, NewVisitComp],
  providers: [RegisterService, SearchPatientService]
})
export class RegisterModule { }
