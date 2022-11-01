import { Component, OnInit } from '@angular/core';
import {AdminNavbarService} from '../../../core/services/admin-navbar.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(public adminNavbarService: AdminNavbarService) {}

  ngOnInit(): void {    
    this.adminNavbarService.changePage({
      path:'/admin/user-manager/users',
      breadcumbs: ['Gestor de usuario', 'Roles']
    })
  }

}
