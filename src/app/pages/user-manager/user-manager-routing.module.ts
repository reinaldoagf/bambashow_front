import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from "./users/users.component";
import { DetailsComponent as UsersDetailsComponent } from './users/details/details.component';
import { RolesComponent } from "./roles/roles.component";

const routes: Routes = [{
  path: "users",
  component: UsersComponent,
},{
  path: "users/details",
  component: UsersDetailsComponent,
},{
  path: "users/details/:id",
  component: UsersDetailsComponent,
},{
  path: "roles",
  component: RolesComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule { }

