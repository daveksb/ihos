import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'primeng/primeng';

import { DiagEditComponent } from './diag-edit.component';
import { DiagListComponent } from './diag-list.component';
import { DiagEditModal } from './diag-edit-modal.component';
import { DiagHomeComponent } from './diag-home.component';

import { RediagComponent } from './rediag.component';

import { DiagService } from './diag.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DataTableModule
    ],
    declarations: [
        DiagHomeComponent, DiagEditComponent,
        DiagEditModal, DiagListComponent, RediagComponent
    ],
    providers: [DiagService],
    exports: [DiagHomeComponent]
})
export class DiagModule { }
