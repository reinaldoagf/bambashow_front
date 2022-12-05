import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { User } from 'src/app/core/models/user.model';
import { Rol } from 'src/app/core/models/rol.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user: User = new User();
  roles: Rol[] = [];
  dropdownSettings: any = {
    singleSelection: true,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    textField: 'name',
    idField: 'id'
  }
    constructor(
      private router: Router,
      private activeRoute: ActivatedRoute,
      private spinner: NgxSpinnerService,
      private restService: RestService,
      private adminNavbarService: AdminNavbarService,
      private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path: '/admin/user-manager/users/details/:id',
      breadcumbs: ['Gestión de usuario', 'Usuarios', 'Detalles']
    })
    this.activeRoute.params.subscribe(routeParams => {
      if(routeParams.id){
        this.user.id = routeParams.id
        this.getData()
      }
    });
  }
  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
        response2,
      ]: any[] = await Promise.all([
        this.restService.get(`/users/get/${this.user.id}`),
        this.restService.get(`/roles`),
      ]);
      this.spinner.hide();
      this.user = response1.data ? response1.data : this.user;
      this.roles = response2.data ? response2.data : [];

    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  async update() {
    try {
      this.spinner.show();
      const response: any = this.restService.put(`/users/update/${this.user.id}`,this.user);
      this.spinner.hide();
      this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
      this.user = response.data ? response.data : this.user;
    } catch (error) {
      this.spinner.hide();
      if (error.error)
        this.notificationService.showError('Error', error.error)
      console.log(error);
    }
  }
  confirmDeleted() {
    if (this.user) {
      Swal.fire({
        title: 'Confirmar operación',
        text: `¿Desea eliminar el usuario "${this.user.email}"?`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, Cancelar'
      }).then(async (result) => {
        if (result.value) {
          try {
            this.spinner.show();
            const response: any = await this.restService.delete(`/users/delete/${this.user.id}`);
            this.spinner.hide();
            if (response !== undefined && response.data) {              
              this.router.navigate(['/admin/user-manager/users']);
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
}
