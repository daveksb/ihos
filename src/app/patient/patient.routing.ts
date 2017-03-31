import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientDetailComp } from './detail.comp';
import { PatientListComp } from './list.comp';

const patientRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'list' },
    { path: 'list', component: PatientListComp },
    { path: 'detail', component: PatientDetailComp },
]

@NgModule({
    imports: [RouterModule.forChild(patientRoutes)],
    exports: [RouterModule]
})

export class PatientRoutingModule {
}