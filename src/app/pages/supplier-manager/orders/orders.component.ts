import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderSupplier } from 'src/app/core/models/order-supplier.model';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RestService } from 'src/app/core/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
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
  orders: OrderSupplier[] = [];
  headerElements: any[] = [
    'PDF',
    'Mensaje',
    'status',
    'Proveedor',
    'Teléfono del proveedor',
    'Correo del proveedor'
  ];
  searchTable: string = '';
  constructor(
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService) { }
  get paginateOrders() {
    const startItem = this.paginations.startItem ? this.paginations.startItem : 0;
    const endItem = this.paginations.endItem ? this.paginations.endItem : this.itemsPerPage;
    return !this.searchTable.length ? this.orders.slice(startItem, endItem) : this.orders;
  }

  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path: '/admin/supplier-manager/orders',
      breadcumbs: ['Gestión de proveedores', 'Pedidos']
    })
    this.getData()
  }
  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/providers/orders`),
      ]);
      this.spinner.hide();
      this.orders = response1.data ? response1.data : [];

    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  /* paginacion */
  onPageChange(event: any): void {
    this.paginations.startItem = (event - 1) * this.itemsPerPage
    this.paginations.endItem = event * this.itemsPerPage
  }
  /* paginacion */
}
