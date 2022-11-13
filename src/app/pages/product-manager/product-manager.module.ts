import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagerRoutingModule } from './product-manager-routing.module';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { FormComponent as RawMaterialFormComponent } from './raw-material/form/form.component';

import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    RawMaterialComponent,
    RawMaterialFormComponent
  ],
  imports: [
    CommonModule,
    ProductManagerRoutingModule,
    SharedModule
  ]
})
export class ProductManagerModule { }
