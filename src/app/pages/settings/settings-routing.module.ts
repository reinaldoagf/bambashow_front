import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { BankDataComponent } from './bank-data/bank-data.component';

const routes: Routes = [{
  path: "social-networks",
  component: SocialNetworksComponent,
},{
  path: "bank-data",
  component: BankDataComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
