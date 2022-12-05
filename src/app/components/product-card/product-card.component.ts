import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/core/models/product.model';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input () card: any;
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    console.log(this.card)
  }
  addItemToCart(item:Product){
    this.cartService.addItem(item);
  }

}
