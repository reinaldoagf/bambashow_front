// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';

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
    declarations: [ LandingComponent ],
    exports:[ LandingComponent ],
    providers: []
})
export class LandingModule { }
