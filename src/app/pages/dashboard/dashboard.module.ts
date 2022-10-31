import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { SectionsModule } from '../../sections/sections.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        SectionsModule,
        ComponentsModule,
        NgbModule
    ],
    declarations: [ DashboardComponent ],
    exports:[ DashboardComponent ],
    providers: []
})
export class LandingModule { }
