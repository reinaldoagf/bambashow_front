import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagerRoutingModule } from './user-manager-routing.module';
import { UsersComponent } from './users/users.component';
import { DetailsComponent as UsersDetailsComponent } from './users/details/details.component';
import { RolesComponent } from './roles/roles.component';

import { SharedModule } from "../../shared/shared.module";
import { FormComponent } from './roles/form/form.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersDetailsComponent, 
    RolesComponent, FormComponent, 
  ],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    SharedModule,
  ]
})
export class UserManagerModule { }
