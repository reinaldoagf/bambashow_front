import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Rol } from 'src/app/core/models/rol.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  rol: Rol = new Rol();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path:'/admin/user-manager/roles/form/:id',
      breadcumbs: ['Gestor de usuario', 'Roles', 'Formulario']
    })
    this.activeRoute.params.subscribe(routeParams => {
      if(routeParams.id){
        this.rol.id = routeParams.id
        this.getData()
      }
    });
  }
  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/roles/get/${this.rol.id}`),
      ]);
      this.spinner.hide();
      this.rol = response1.data ? response1.data : this.rol;
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
}
