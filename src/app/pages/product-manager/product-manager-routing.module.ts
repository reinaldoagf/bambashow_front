import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RawMaterialComponent } from './raw-material/raw-material.component';
import { FormComponent as RawMaterialFormComponent } from './raw-material/form/form.component';
import { CategoriesComponent as ProductCategoriesComponent } from './categories/categories.component';

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
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagerRoutingModule { }
