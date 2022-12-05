import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestService } from 'src/app/core/services/rest.service';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []
  searchTable: string = '';
  
  constructor(
      private spinner: NgxSpinnerService,
      private restService: RestService,) { }

  ngOnInit(): void {
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
}
