import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTableModule, SharedModule, DialogModule, InputMaskModule, ConfirmDialogModule, GrowlModule, MessagesModule } from 'primeng/primeng';

import { CardRoomRoutingModule } from './card-room.routing';
import { MyShareModule } from '../share/share.module';

import { RegisterComp } from './register.comp';
import { EditPatientComp } from './edit-patient.comp';
import { VisitComp } from './visit.comp';

import { CardRoomService } from './card-room.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardRoomRoutingModule,
    InputMaskModule, DialogModule, DataTableModule, SharedModule, ConfirmDialogModule, GrowlModule, MessagesModule,
    MyShareModule
  ],
  declarations: [VisitComp, RegisterComp, EditPatientComp],
  providers: [CardRoomService]
})
export class CardRoomModule { }
