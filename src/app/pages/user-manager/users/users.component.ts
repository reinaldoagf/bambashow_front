import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  /*paginacion*/
  currentPage = 1;
  page = 1;
  itemsPerPage = 7;
  pageSize: number;
  paginations: any = {
    startItem: null,
    endItem: null
  }
  /*paginacion*/
  users: User[] = [];
  headerElements: any[] = [
    'Nombre',
    'email',
    'rol'
  ];
  searchTable: string = '';

  constructor(
    private restService: RestService,
    public adminNavbarService: AdminNavbarService) { }
  get paginateUsers() {
    const startItem = this.paginations.startItem ? this.paginations.startItem : 0;
    const endItem = this.paginations.endItem ? this.paginations.endItem : this.itemsPerPage;
    return !this.searchTable.length ? this.users.slice(startItem, endItem) : this.users;
  }

  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path: '/admin/user-manager/users',
      breadcumbs: ['Gestor de usuario', 'Usuarios']
    })
    this.getData()
  }
  async getData() {
    try {
      // this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/users`),
      ]);
      // this.spinner.hide();
      this.users = response1.data ? response1.data : [];
      console.log('response1:', response1)


    } catch (error) {
      // this.spinner.hide();
      console.log(error);
    }
  }
  /* paginacion */
  onPageChange(event: any): void {
    console.log('event:', event)
    this.paginations.startItem = (event - 1) * this.itemsPerPage
    this.paginations.endItem = event * this.itemsPerPage
  }
  /* paginacion */
  /* public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  } */
}
