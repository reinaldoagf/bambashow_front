import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class CartService {
  get getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }
  constructor() {  }

  @Output() change: EventEmitter<any> = new EventEmitter(); // Emitter when some value changed

  /**
   * Get all shopping cart
   * @param product Item to add
   */
  getAll() {
    let user = this.getUser;
    return user.cart ? user.cart : [];
  }

  /**
   * Add product to shopping cart
   * @param product Item to add
   */
  addItem(product: any){
    let user = this.getUser;
    if(user.cart.find(item => item.id == product.id) == undefined){
      user.cart.push(product);
      localStorage.setItem('user', JSON.stringify(user));
      this.change.emit();
    }
  }

  /**
   * Add product to shopping cart
   * @param product Item to add
   */
  removeItem(product: any){
    let user = this.getUser;
    user.cart = user.cart.filter(item => item.id != product.id);
    localStorage.setItem('user', JSON.stringify(user));
    this.change.emit();
  }

  /**
   * Remove cart from localstorage
   */
  emptyCart(){
    let user = this.getUser;
    user.cart = [];
    localStorage.setItem('user', JSON.stringify(user));
    this.change.emit();
  }
  updateAll(elements){
    let user = this.getUser;
    user.cart = elements;
    localStorage.setItem('user', JSON.stringify(user));
    this.change.emit();
  }
}
