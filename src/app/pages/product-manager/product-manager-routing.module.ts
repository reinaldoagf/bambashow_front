import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RawMaterialComponent } from './raw-material/raw-material.component';
import { FormComponent as RawMaterialFormComponent } from './raw-material/form/form.component';
import { CategoriesComponent as ProductCategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { FormComponent as ProductFormComponent } from './products/form/form.component';

const routes: Routes = [{
  path: "raw-material",
  component: RawMaterialComponent,
},{
  path: "raw-material/form",
  component: RawMaterialFormComponent,
},{
  path: "raw-material/form/:id",
  component: RawMaterialFormComponent,
},{
  path: "categories",
  component: ProductCategoriesComponent,
},{
  path: "products",
  component: ProductsComponent,
},{
  path: "products/form",
  component: ProductFormComponent,
},{
  path: "products/form/:id",
  component: ProductFormComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagerRoutingModule { }
