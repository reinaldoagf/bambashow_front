import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';

import { SectionsModule } from '../../sections/sections.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        // FormsModule,
        RouterModule,
        SectionsModule,
        ComponentsModule,
        NgbModule
    ],
    declarations: [ LandingComponent ],
    exports:[ LandingComponent ],
    providers: []
})
export class LandingModule { }
