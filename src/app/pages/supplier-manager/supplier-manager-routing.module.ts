import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProvidersComponent } from './providers/providers.component';

const routes: Routes = [{
  path: "providers",
  component: ProvidersComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierManagerRoutingModule { }
