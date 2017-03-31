import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComp } from './register.comp';
import { EditPatientComp } from './edit-patient.comp';
import { NewVisitComp } from './newvisit.comp';
import { TestComp } from './test.comp';

const regisRoutes: Routes = [
    { path: '', redirectTo: 'register' },
    { path: 'test', component: TestComp },
    { path: 'register', component: RegisterComp },
    { path: 'edit/:hn', component: EditPatientComp },
    { path: 'newvisit', component: NewVisitComp },
]

@NgModule({
    imports: [RouterModule.forChild(regisRoutes)],
    exports: [RouterModule]
})

export class RegisterRoutingModule {
}