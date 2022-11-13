import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OrderSupplier } from 'src/app/core/models/order-supplier.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  order: OrderSupplier = new OrderSupplier();
  
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
      breadcumbs: ['Gestor de proveedores', 'Pedidos', 'Formulario']
    })
  }

  async save() {
    try {
      if(this.order.id){
        this.spinner.show();
        const response: any = this.restService.put(`/providers/orders/update/${this.order.id}`,this.order);
        this.spinner.hide();
        this.order = response.data ? response.data : this.order;
        this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
        // this.location.back();
      }else{
        this.spinner.show();
        const response: any = this.restService.post(`/providers/orders/create`,this.order);
        this.spinner.hide();
        console.log('response:',response)
        this.order = response.data ? response.data : this.order;
        this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
        // this.location.back();
      }
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
}
