import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from "../../shared/shared.module";
import { SectionsModule } from '../../sections/sections.module';
import { ComponentsModule } from '../../components/components.module';
import { CoreModule } from '../../core/core.module';

import { ProductOrderFormComponent } from './product-order-form.component';

@NgModule({
  declarations: [
    ProductOrderFormComponent
  ],
  imports: [
      CommonModule,
      RouterModule,
      SectionsModule,
      ComponentsModule,
      SharedModule,
      CoreModule, 
  ],
})
export class ShoppingCartModule { }
