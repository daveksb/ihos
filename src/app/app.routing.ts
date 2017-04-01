import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth-guard.service';
import { VisitComponent } from './visit/visit.component';
import { ReportLabComponent } from './report/report-lab.comp';
//import { ReportICD10tmComp } from './report/report-icd10tm.comp';
//import { ReportGeoComp } from './report/report-geo.comp';
//import { ReportAgeComp } from './report/report-age.comp';

const mainRoutes: Routes = [
    //{ path: '', component: LoginComponent },    
    { path: '', loadChildren: './login/login.module#LoginModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'card-room', loadChildren: './card-room/card-room.module#CardRoomModule' },
    { path: 'patient', loadChildren: './patient/patient.module#PatientModule' },

    { path: 'visit/:regno', component: VisitComponent, canActivate: [AuthGuard] },
    { path: 'report-lab', component: ReportLabComponent, canActivate: [AuthGuard] },
    //{ path: 'report-icd10tm', component: ReportICD10tmComp, canActivate: [AuthGuard] },
    //{ path: 'report-geo', component: ReportGeoComp, canActivate: [AuthGuard] },
    //{ path: 'report-age', component: ReportAgeComp, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(mainRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class RoutingModule { }
