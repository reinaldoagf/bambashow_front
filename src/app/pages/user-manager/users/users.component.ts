import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/core/models/user.model';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RestService } from 'src/app/core/services/rest.service';
import Swal from 'sweetalert2';

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
    'foto',
    'nombre',
    'email',
    'dirección',
    'rol'
  ];
  searchTable: string = '';

  constructor(
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService) { }
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
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/users`),
      ]);
      this.spinner.hide();
      this.users = response1.data ? response1.data : [];

    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  confirmDeleted(item:any) {
    if (item) {
      Swal.fire({
        title: 'Confirmar operación',
        text: `¿Desea eliminar el usuario "${item.email}"?`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, Cancelar'
      }).then(async (result) => {
        if (result.value) {
          try {
            this.spinner.show();
            const response: any = await this.restService.delete(`/users/delete/${item.id}`);
            this.spinner.hide();
            if (response !== undefined && response.data) {
              this.users = this.users.filter(( element: any ) => {
                if (element.id !== item.id) return element
              })
              this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
            }
          } catch (error) {
            this.spinner.hide();
            if (error.error)
              this.notificationService.showError('Error', error.error)
            console.log('error:', error)
          }
        }
      })
    }
  }
  /* paginacion */
  onPageChange(event: any): void {
    this.paginations.startItem = (event - 1) * this.itemsPerPage
    this.paginations.endItem = event * this.itemsPerPage
  }
  /* paginacion */
}
