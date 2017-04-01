import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { GrowlModule } from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, FormsModule, LoginRoutingModule, GrowlModule],
    exports: [LoginComponent],
    declarations: [LoginComponent],
    //providers: [LoginService],  // <--- ใช้ภายใน module
})
export class LoginModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LoginModule,
            providers: [LoginService]  // <--- ส่งให้ภายนอกใช้
        };
    }
}
