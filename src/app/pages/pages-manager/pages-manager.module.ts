import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesManagerRoutingModule } from './pages-manager-routing.module';
import { HomeComponent } from './home/home.component';
import { FormComponent as HomeFormComponent } from './home/form/form.component';

import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    HomeComponent,
    HomeFormComponent
  ],
  imports: [
    CommonModule,
    PagesManagerRoutingModule,
    SharedModule
  ]
})
export class PagesManagerModule { }
