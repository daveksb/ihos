import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComp } from './register.comp';
import { EditPatientComp } from './edit-patient.comp';
import { VisitComp } from './visit.comp';

const regisRoutes: Routes = [
    { path: '', redirectTo: 'register' },
    { path: 'register', component: RegisterComp },
    { path: 'edit/:hn', component: EditPatientComp },
    { path: 'visit', component: VisitComp },
    //{ path: 'visit', component: NewVisitComp, canActivate: [AuthGuard] },   // ผู้ป่วยเก่า ลงทะเบียนเข้าตรวจ
    //{ path: 'visit/:hn', component: NewVisitComp, canActivate: [AuthGuard] }, // ผู้ป่วยใหม่ ลงทะเบียนผู้ป่วยแล้วแล้วลงทะเบียนเข้าตรวจต่อ
]

@NgModule({
    imports: [RouterModule.forChild(regisRoutes)],
    exports: [RouterModule]
})

export class CardRoomRoutingModule {
}