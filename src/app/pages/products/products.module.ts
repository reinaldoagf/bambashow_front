import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from "../../shared/shared.module";
import { SectionsModule } from '../../sections/sections.module';
import { ComponentsModule } from '../../components/components.module';
import { CoreModule } from '../../core/core.module';

import { ProductsComponent } from './products.component';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SectionsModule,
    ComponentsModule,
    SharedModule,
    CoreModule, 
  ]
})
export class ProductsModule { }
