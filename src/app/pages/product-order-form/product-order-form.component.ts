import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { OrderProduct } from "src/app/core/models/order-product.model";
import { User } from "src/app/core/models/user.model";
import { CartService } from "src/app/core/services/cart.service";
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './product-order-form.component.html',
  styleUrls: ['./product-order-form.component.css']
})
export class ProductOrderFormComponent implements OnInit {

  stepContainerClass = "steps-container slider-one-active";
  orderProduct:OrderProduct= new OrderProduct();
  products:any[]=[];
  
  dropdownSettings: any = {
    singleSelection: true,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    /* textField: 'name',
    idField: 'id' */
  }
  step: number = 0;
  fileData: File = null;
  payment:any=null;
  public user:User=null;
  constructor(
    private cartService: CartService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.products = this.cartService.getAll();
    this.orderProduct.details = this.products.map(e => {
      return {
        quatity:1,
        size:null,
        id_product:e.id,
        product:e,
        id_order_product:null,
      }
    })
    this.cartService.change.subscribe(result=>{
      this.products = this.cartService.getAll();
    });
    this.getUser();
  }

  removeItemToCart(item:Product){
    this.cartService.removeItem(item);
  }
  nextStep(_class:string): void {
    this.step++;
    this.stepContainerClass = _class;
    console.log(this.orderProduct)
  } 
  /*<<<<<<<<<<<<<<<<<<<<<<<MANEJO DE IMAGEN>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  async fileProgress(fileInput: any,payment:any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview(payment);
  }
  preview(payment:any) {
    if (
      this.fileData.type.match('image/png') ||
      this.fileData.type.match('image/jpg') ||
      this.fileData.type.match('image/jpeg')
    ) {
      this.payment = payment;
      this.payment.image = this.fileData;
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.fileData);
    } else {
      this.notificationService.showWarning('Formato no permitido', 'Solo se permite formato .png, .jpg, y .jpeg')
    }
  }
  handleReaderLoaded(e) {
    this.payment.image = 'data:image/png;base64,' + btoa(e.target.result)
  }
  /*<<<<<<<<<<<<<<<<<<<<<<<MANEJO DE IMAGEN>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  
  getUser(){
    this.user=JSON.parse(localStorage.getItem("user"));
  }
}
