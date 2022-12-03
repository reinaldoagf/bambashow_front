import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';
import { OrderProduct } from 'src/app/core/models/order-product.model';

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
  order: OrderProduct = new OrderProduct();
  orders: OrderProduct[] = [];
  headerElements: any[] = [
    'usuario',
    'productos',
    'status',
  ];
  searchTable: string = '';
  closeResult: string;
  dropdownSettings: any = {
    singleSelection: true,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    idField:'name',
    textField:'name'
  }
  get paginateOrders() {
    const startItem = this.paginations.startItem ? this.paginations.startItem : 0;
    const endItem = this.paginations.endItem ? this.paginations.endItem : this.itemsPerPage;
    return !this.searchTable.length ? this.orders.slice(startItem, endItem) : this.orders;
  }
  constructor(
    private spinner: NgxSpinnerService,
    private adminNavbarService: AdminNavbarService,
    private restService: RestService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path: '/admin/product-manager/orders',
      breadcumbs: ['Gestión de productos', 'Pedidos']
    })
    this.getData()
  }

  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/products/orders`),
      ]);
      this.spinner.hide();
      this.orders = response1.data ? response1.data : [];
      this.orders = this.orders.map(e => {
        return {...e,status:[e.status]}
      });
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
  /* carga de valores por defecto */
  setDefaultValues() {
    this.order = new OrderProduct();
  }
  openPayments(item: OrderProduct, content: any) {
    this.setDefaultValues();
    this.order = item;
    console.log(this.order)
    this.open(content)
  }
  /*abre modal*/
  open(content: any) {
    this.modalService.open(content, { size: 'lg',centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
