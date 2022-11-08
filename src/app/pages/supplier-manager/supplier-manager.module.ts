import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierManagerRoutingModule } from './supplier-manager-routing.module';
import { ProvidersComponent } from './providers/providers.component';

import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    ProvidersComponent
  ],
  imports: [
    CommonModule,
    SupplierManagerRoutingModule,
    SharedModule
  ]
})
export class SupplierManagerModule { }
