import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
   products: Product[] = [];
   headerElements: any[] = [
     'nombre',
     'categoria',
     'cantidad / talla',
   ];
   searchTable: string = '';
   constructor(
     private spinner: NgxSpinnerService,
     private restService: RestService,
     private adminNavbarService: AdminNavbarService,
     private notificationService: NotificationService) { }
     get paginateProducts() {
       const startItem = this.paginations.startItem ? this.paginations.startItem : 0;
       const endItem = this.paginations.endItem ? this.paginations.endItem : this.itemsPerPage;
       return !this.searchTable.length ? this.products.slice(startItem, endItem) : this.products;
     }
   ngOnInit(): void {
     this.adminNavbarService.changePage({
       path: '/admin/product-manager/products',
       breadcumbs: ['Gestor de productos', 'Productos']
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
 
   confirmDeleted(item:any) {
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
               this.products = this.products.filter(( element: any ) => {
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

}
