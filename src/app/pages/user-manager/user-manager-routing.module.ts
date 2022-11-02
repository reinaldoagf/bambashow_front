import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from "./users/users.component";
import { DetailsComponent as UsersDetailsComponent } from './users/details/details.component';
import { RolesComponent } from "./roles/roles.component";
import { FormComponent as RolesFormComponent } from './roles/form/form.component';

const routes: Routes = [{
  path: "users",
  component: UsersComponent,
},{
  path: "users/details/:id",
  component: UsersDetailsComponent,
},{
  path: "roles",
  component: RolesComponent,
},{
  path: "roles/form",
  component: RolesFormComponent,
},{
  path: "roles/form/:id",
  component: RolesFormComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule { }

