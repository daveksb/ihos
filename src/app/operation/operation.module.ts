import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GenHomeComponent } from './general/gen-home.component';
import { GenListComponent } from './general/gen-list.component';
import { GenEditComponent } from './general/gen-edit.component';
import { ItemsModal } from './general/gen-modal.component';
import { GeneralService } from './general/general.service';

import { DentHomeComponent } from './dental/dent-home.component';
import { DentListComponent } from './dental/dent-list.component';
import { DentEditComponent } from './dental/dent-edit.component';
import { DentModal } from './dental/dent-modal.component';
import { DentIcd9Modal } from './dental/icd9-modal.component';
import { DentalService } from './dental/dental.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [GenHomeComponent, GenListComponent, GenEditComponent, ItemsModal, DentHomeComponent, DentListComponent, DentEditComponent, DentModal, DentIcd9Modal],
    providers: [GeneralService, DentalService],
    exports: [GenHomeComponent, DentHomeComponent]  // สามารถเรียกใช้ได้จาก module ภายนอก ในที่นี้คือ module visit
})
export class OperaionModule { }
