import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagerRoutingModule } from './user-manager-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';

import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    SharedModule,
  ]
})
export class UserManagerModule { }
