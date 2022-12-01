
export class Product {
    id: number;
    name: string;
    price: number;
    stock: any[];
    images: any[];
    constructor(){
        this.id=null;
        this.name=null;
        this.stock=[];
        this.images=[];
    }
}