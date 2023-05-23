import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Product } from 'src/app/core/models/product.model';
import { ProductCategory } from 'src/app/core/models/product-category.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  product: Product = new Product();
  categories: ProductCategory[] = [];

  categoryDropdownSettings: any = {
    singleSelection: true,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    textField: 'name',
    idField: 'id'
  }
  dropdownSettings: any = {
    singleSelection: true,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    /* textField: 'name',
    idField: 'id' */
  }
  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService) { }
  get formData() {
    return {
      ...this.product,
      id_product_category: this.product.id_product_category && this.product.id_product_category[0] ? this.product.id_product_category[0].id : null,
    }
  }
  get categoryOptions() {
    return this.categories.map(e => {
      return {
        ...e,
        id_category: e.id
      }
    })
  }
  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path: '/admin/user-manager/products/form/:id',
      breadcumbs: ['Gestión de productos', 'Productos', 'Formulario']
    })
    this.getData()
  }
  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/categories`),
      ]);
      this.spinner.hide();
      this.categories = response1.data ? response1.data : [];
      this.activeRoute.params.subscribe(routeParams => {
        if (routeParams.id) {
          this.product.id = routeParams.id
          this.getElement()
        }
      });
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  async getElement() {
    try {
      this.spinner.show();
      const response: any = this.restService.get(`/products/get/${this.product.id}`);
      this.spinner.hide();
      this.product = response.data ? response.data : this.product;
      this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  async save() {
    console.log("formData:",this.formData)
    try {
      if (this.product.id) {
        this.spinner.show();
        const response: any = this.restService.put(`/products/update/${this.product.id}`, this.formData);
        this.spinner.hide();
        this.product = response.data ? response.data : this.product;
        this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
        this.location.back();
      } else {
        this.spinner.show();
        const response: any = this.restService.post(`/products/create`, this.formData);
        console.log("response:",response)
        this.spinner.hide();
        this.product = response.data ? response.data : this.product;
        this.notificationService.showSuccess('Operación realiza exitosamente', response.message)
        this.location.back();
      }
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  onItemSelect($event) {
    console.log('$event:', $event)
  }
  addItem() {
    this.product.stock = [...this.product.stock,{
      id_product: null,
      quantity: null,
      size: null
    }]
  }
  removeItem(item){
    this.product.stock = this.product.stock.filter(e => this.product.stock.indexOf(e) !== this.product.stock.indexOf(item))
  }
}
