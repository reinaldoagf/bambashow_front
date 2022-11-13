import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProvidersComponent } from './providers/providers.component';
import { FormComponent as ProvidersFormComponent } from './providers/form/form.component';
import { OrdersComponent as ProvidersOrdersComponent } from './orders/orders.component';
import { FormComponent as ProvidersOrdersFormComponent } from './orders/form/form.component';

const routes: Routes = [{
  path: "providers",
  component: ProvidersComponent,
},{
  path: "providers/form",
  component: ProvidersFormComponent,
},{
  path: "providers/form/:id",
  component: ProvidersFormComponent,
},{
  path: "orders",
  component: ProvidersOrdersComponent,
},{
  path: "orders/form",
  component: ProvidersOrdersFormComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierManagerRoutingModule { }
