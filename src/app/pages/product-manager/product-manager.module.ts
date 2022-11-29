import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagerRoutingModule } from './product-manager-routing.module';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { FormComponent as RawMaterialFormComponent } from './raw-material/form/form.component';
import { CategoriesComponent as ProductCategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';

import { SharedModule } from "../../shared/shared.module";
import { FormComponent } from './products/form/form.component';

@NgModule({
  declarations: [
    RawMaterialComponent,
    RawMaterialFormComponent,
    ProductCategoriesComponent,
    ProductsComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ProductManagerRoutingModule,
    SharedModule
  ]
})
export class ProductManagerModule { }
