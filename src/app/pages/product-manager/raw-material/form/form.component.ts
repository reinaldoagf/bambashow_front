import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RawMaterial } from 'src/app/core/models/raw-material.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  rawMaterial: RawMaterial = new RawMaterial();

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
      path:'/admin/user-manager/raw-material/form/:id',
      breadcumbs: ['Gestión de productos', 'Materia prima', 'Formulario']
    })
    this.activeRoute.params.subscribe(routeParams => {
      if(routeParams.id){
        this.rawMaterial.id = routeParams.id
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
        this.restService.get(`/raw-material/get/${this.rawMaterial.id}`),
      ]);
      this.spinner.hide();
      this.rawMaterial = response1.data ? response1.data : this.rawMaterial;
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  async save() {
    try {
      this.spinner.show();
      const response: any = this.restService.put(`/raw-material/update/${this.rawMaterial.id}`,this.rawMaterial);
      this.spinner.hide();
      this.rawMaterial = response.data ? response.data : this.rawMaterial;
      this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
      this.location.back();
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }

}
