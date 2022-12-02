// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SharedModule } from "../../shared/shared.module";
import { SectionsModule } from '../../sections/sections.module';
import { ComponentsModule } from '../../components/components.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        // BrowserModule,
        RouterModule,
        SectionsModule,
        ComponentsModule,
        SharedModule,
        CoreModule, 
    ],
    declarations: [ HomeComponent ],
    exports:[ HomeComponent ],
    providers: []
})
export class HomeModule { }
