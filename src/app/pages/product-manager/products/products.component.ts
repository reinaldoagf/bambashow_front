import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryAction } from '@kolkov/ngx-gallery';
import { Product } from 'src/app/core/models/product.model';
import { AdminNavbarService } from 'src/app/core/services/admin-navbar.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RestService } from 'src/app/core/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  /*paginacion*/
  currentPage = 1;
  page = 1;
  itemsPerPage = 4;
  pageSize: number;
  paginations: any = {
    startItem: null,
    endItem: null
  }
  /*paginacion*/
  product: Product = new Product();
  products: Product[] = [];
  headerElements: any[] = [
    'imagenes',
    'nombre',
    'precio',
    'categoria',
    'cantidad / talla',
  ];
  searchTable: string = '';
  modalRef: any = null;
  closeResult: string;
  galleryImages: NgxGalleryImage[] = [];
  galleryOptions: NgxGalleryOptions[] = [{
    width: '100%',
    height: '400px',
    thumbnailsColumns: 4,
    imageAnimation: NgxGalleryAnimation.Slide,
    imageActions: []
  }];
  constructor(
    private spinner: NgxSpinnerService,
    private restService: RestService,
    private adminNavbarService: AdminNavbarService,
    private notificationService: NotificationService,
    public modalService: NgbModal) { }
  get paginateProducts() {
    const startItem = this.paginations.startItem ? this.paginations.startItem : 0;
    const endItem = this.paginations.endItem ? this.paginations.endItem : this.itemsPerPage;
    return !this.searchTable.length ? this.products.slice(startItem, endItem) : this.products;
  }
  ngOnInit(): void {
    this.adminNavbarService.changePage({
      path: '/admin/product-manager/products',
      breadcumbs: ['Gestión de productos', 'Productos']
    })
    this.getData()
  }
  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/products`),
      ]);
      this.spinner.hide();
      console.log(response1)
      this.products = response1.data ? response1.data : [];

    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }

  /* carga de valores por defecto */
  setDefaultValues() {
    this.product = new Product();
  }
  confirmDeleted(item: any) {
    if (item) {
      Swal.fire({
        title: 'Confirmar operación',
        text: `¿Desea eliminar "${item.name}"?`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, Cancelar'
      }).then(async (result) => {
        if (result.value) {
          try {
            this.spinner.show();
            const response: any = await this.restService.delete(`/products/delete/${item.id}`);
            this.spinner.hide();
            if (response !== undefined && response.data) {
              this.products = this.products.filter((element: any) => {
                if (element.id !== item.id) return element
              })
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
  /* paginacion */
  onPageChange(event: any): void {
    this.paginations.startItem = (event - 1) * this.itemsPerPage
    this.paginations.endItem = event * this.itemsPerPage
  }
  /* paginacion */
  openGallery(item: Product, content: any) {
    this.setDefaultValues();
    this.product = item;
    this.galleryImages = this.product.images.map(e => {
      return {
        small: e.url,
        medium: e.url,
        big: e.url
      }
    })
    // console.log(this.product)
    this.open(content)
  }
  /*abre modal*/
  /* open(content: any) {
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }
   */
  open(content: any) {
    this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
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
  /* changeEvent($event) {
   if ($event.image?.big && $event.image?.medium && $event.image?.small) {
     const find = this.product.images.find(e => e.src == $event.image.big)
     // this.imageName = find?.title ? find.title : null;
   } 
 } */
}
