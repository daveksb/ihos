import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IAppConfig } from './app.config.interface';
import { APP_CONFIG, AppConfig } from './app.config';
import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './menu/top-menu.component';
import { VisitModule } from './visit/visit.module';
import { DiagModule } from './diag/diag.module';
import { OperaionModule } from './operation/operation.module';
import { VitalsignModule } from './vitalsign/vitalsign.module';
import { RegisterModule } from './regis/register.module';
import { PatientModule } from './patient/patient.module';
import { ReportModule } from './report/report.module';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { ConfirmDialogModule, ConfirmationService, GrowlModule } from 'primeng/primeng';

@NgModule({
    declarations: [
        AppComponent,
        TopMenuComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutingModule,
        ReportModule,
        RegisterModule,
        VisitModule,
        DiagModule,
        OperaionModule,
        VitalsignModule,
        PatientModule,
        ConfirmDialogModule,
        GrowlModule,
    ],
    providers: [
        //AuthGuard,
        LoginService, // use as global service for auth-guard check
        ConfirmationService,
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

