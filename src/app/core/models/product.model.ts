
export class Product {
    id: number;
    name: string;
    price: number;
    product_category:any;
    id_product_category:any; 
    stock: any[];
    images: any[];
    constructor(){
        this.id=null;
        this.name=null;
        this.price=null;
        this.product_category=null;
        this.id_product_category=null;
        this.stock=[];
        this.images=[];
    }
}