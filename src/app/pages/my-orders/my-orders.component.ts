import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { RestService } from 'src/app/core/services/rest.service';
import { User } from "src/app/core/models/user.model";
import { OrderProduct } from 'src/app/core/models/order-product.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
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
  user: User = new User();
  order: OrderProduct = new OrderProduct();
  orders: OrderProduct[] = [];
  headerElements: any[] = [
    'productos',
    'status',
  ];
  searchTable: string = '';
  closeResult: string;

  constructor(
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private modalService: NgbModal) { }
  get getMyOrders() {
      return this.orders.filter(e=> e.id_user == this.user.id);
  }
  get paginateOrders() {
    const startItem = this.paginations.startItem ? this.paginations.startItem : 0;
    const endItem = this.paginations.endItem ? this.paginations.endItem : this.itemsPerPage;
    return !this.searchTable.length ? this.getMyOrders.slice(startItem, endItem) : this.getMyOrders;
  }
  ngOnInit() {
    this.adminNavbarService.changePage({
      path: '/admin/my-orders',
      breadcumbs: ['Mis pedidos']
    })
    this.getUser()
  }
  /*obtiene usuario en sesión desde localStorage*/
  getUser() {
    this.user = JSON.parse(localStorage.getItem("user"));
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
      console.log(response1)
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
  setDefaultValues() {
    this.order = new OrderProduct();
  }
  openPayments(item: OrderProduct, content: any) {
    this.setDefaultValues();
    this.order = item;
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
