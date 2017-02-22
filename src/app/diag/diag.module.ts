import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DiagEditComponent } from './diag-edit.component';
import { DiagListComponent } from './diag-list.component';
import { DiagEditModal } from './diag-edit-modal.component';
import { DiagHomeComponent } from './diag-home.component';

import { DiagService } from './diag.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [DiagHomeComponent, DiagEditComponent, DiagEditModal, DiagListComponent],
    providers: [DiagService],
    exports: [DiagHomeComponent]
})
export class DiagModule { }
