import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './signup.component';

import { SectionsModule } from '../../sections/sections.module';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from '../../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SectionsModule,
        ComponentsModule,
        SharedModule,
        CoreModule, 
        NgbModule
    ],
    declarations: [ SignupComponent ],
    exports:[ SignupComponent ],
    providers: []
})
export class SignupModule { }
