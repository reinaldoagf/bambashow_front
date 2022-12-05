// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { SharedModule } from "../../shared/shared.module";
import { SectionsModule } from '../../sections/sections.module';
import { ComponentsModule } from '../../components/components.module';
import { CoreModule } from '../../core/core.module';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SectionsModule,
        ComponentsModule,
        SharedModule,
        CoreModule,
        DashboardRoutingModule
    ],
    declarations: [ DashboardComponent ],
    exports:[ DashboardComponent ],
    providers: []
})
export class DashboardModule { }
