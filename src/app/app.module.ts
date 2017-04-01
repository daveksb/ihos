import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { IAppConfig } from './app.config.interface';
import { APP_CONFIG, AppConfig } from './app.config';
import { RoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './menu/top-menu.component';

import { MyShareModule } from './share/share.module';
import { VisitModule } from './visit/visit.module';
import { DiagModule } from './diag/diag.module';
import { OperaionModule } from './operation/operation.module';
import { VitalsignModule } from './vitalsign/vitalsign.module';
import { ReportModule } from './report/report.module';
import { LoginModule } from './login/login.module';

@NgModule({
    declarations: [
        AppComponent,
        TopMenuComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        RoutingModule,

        MyShareModule.forRoot(),
        LoginModule.forRoot(),

        ReportModule,
        VisitModule,
        DiagModule,
        OperaionModule,
        VitalsignModule,
    ],
    providers: [
        //AuthGuard,
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }