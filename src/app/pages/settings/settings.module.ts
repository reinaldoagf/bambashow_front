import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { BankDataComponent } from './bank-data/bank-data.component';

import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    SocialNetworksComponent,
    BankDataComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
