import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { GuardService } from "src/app/core/services/guard.service";
@Component({
  selector: 'app-fixed-plugin',
  templateUrl: './fixed-plugin.component.html',
  styleUrls: ['./fixed-plugin.component.scss']
})
export class FixedPluginComponent implements OnInit {
  showDropdown: boolean = false;
  products:any[]=[];
  constructor(
    private cartService: CartService,private guardService: GuardService,) { }

  get isLoggedIn() {
      return this.guardService.isLoggedIn();
  }
  ngOnInit(): void {
    this.products = this.cartService.getAll();
    this.cartService.change.subscribe(result=>{
      this.products = this.cartService.getAll();
    });
  }

  removeItemToCart(item:Product){
    this.cartService.removeItem(item);
  }
}
