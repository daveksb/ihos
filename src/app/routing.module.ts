import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth-guard.service';
import { VisitComponent } from './visit/visit.component';
import { RegisterComp } from './regis/register.comp';
import { EditPatientComp } from './regis/edit-patient.comp';
import { NewVisitComp } from './regis/newvisit.comp';
import { ReportLabComponent } from './report/report-lab.comp';
//import { ReportICD10tmComp } from './report/report-icd10tm.comp';
//import { ReportGeoComp } from './report/report-geo.comp';
//import { ReportAgeComp } from './report/report-age.comp';
import { PatientListComponent } from './patient/patient-list.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComp, canActivate: [AuthGuard] },
    { path: 'edit-patient/:hn', component: EditPatientComp, canActivate: [AuthGuard] }, // แก้ไขประวัติผู้ป่วยเก่า
    { path: 'newvisit', component: NewVisitComp, canActivate: [AuthGuard] },   // ผู้ป่วยเก่า ลงทะเบียนเข้าตรวจ
    { path: 'newvisit/:hn', component: NewVisitComp, canActivate: [AuthGuard] }, // ผู้ป่วยใหม่ ลงทะเบียนผู้ป่วยแล้วแล้วลงทะเบียนเข้าตรวจต่อ
    { path: 'visit/:regno', component: VisitComponent, canActivate: [AuthGuard] },
    { path: 'patient-list', component: PatientListComponent, canActivate: [AuthGuard] },
    { path: 'report-lab', component: ReportLabComponent, canActivate: [AuthGuard] },
    //{ path: 'report-icd10tm', component: ReportICD10tmComp, canActivate: [AuthGuard] },
    //{ path: 'report-geo', component: ReportGeoComp, canActivate: [AuthGuard] },
    //{ path: 'report-age', component: ReportAgeComp, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class RoutingModule { }
