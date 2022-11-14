import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Provider } from 'src/app/core/models/provider.model';
import { OrderSupplier } from 'src/app/core/models/order-supplier.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  order: OrderSupplier = new OrderSupplier();
  providers: Provider[] = [];
  dropdownSettings: any = {
    singleSelection: true,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    textField:'name',
    idField:'id'
  }
  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService) { }
    get formData(){
      return {
        id: this.order.id,
        message: this.order.message, 
        pdf: this.order.pdf, 
        status: this.order.status, 
        id_provider: this.order.id_provider[0] ?this.order.id_provider[0].id : null
      }
    }
  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path:'/admin/user-manager/providers/form/:id',
      breadcumbs: ['Gestor de proveedores', 'Pedidos', 'Formulario']
    })
    this.getData()
  }
  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/providers`),
      ]);
      this.spinner.hide();
      this.providers = response1.data ? response1.data : [];
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }

  async save() {
    console.log(this.formData)
    try {
      if(this.order.id){
        this.spinner.show();
        const response: any = this.restService.put(`/providers/orders/update/${this.order.id}`,this.formData);
        this.spinner.hide();
        this.order = response.data ? response.data : this.order;
        this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
        this.location.back();
      }else{
        this.spinner.show();
        const response: any = this.restService.post(`/providers/orders/create`,this.formData);
        this.spinner.hide();
        console.log('response:',response)
        this.order = response.data ? response.data : this.order;
        this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
        this.location.back();
      }
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  onItemSelect($event){
    console.log('$event:',$event)
  }
}
