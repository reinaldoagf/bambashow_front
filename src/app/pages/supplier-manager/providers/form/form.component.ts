import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Provider } from 'src/app/core/models/provider.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  provider: Provider = new Provider();

  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path:'/admin/user-manager/providers/form/:id',
      breadcumbs: ['Gestión de usuario', 'Proveedores', 'Formulario']
    })
    this.activeRoute.params.subscribe(routeParams => {
      if(routeParams.id){
        this.provider.id = routeParams.id
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
        this.restService.get(`/providers/get/${this.provider.id}`),
      ]);
      this.spinner.hide();
      this.provider = response1.data ? response1.data : this.provider;
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  async save() {
    try {
      if(this.provider.id){
        this.spinner.show();
        const response: any = this.restService.put(`/providers/update/${this.provider.id}`,this.provider);
        this.spinner.hide();
        this.provider = response.data ? response.data : this.provider;
        this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
        this.location.back();
      }else{
        this.spinner.show();
        const response: any = this.restService.post(`/providers/create`,this.provider);
        this.spinner.hide();
        this.provider = response.data ? response.data : this.provider;
        this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
        this.location.back();
      }
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
}
