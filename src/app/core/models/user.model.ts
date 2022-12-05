export class User {
    id: number;
    name: string;
    email: string;
    password:string;
    password_confirmation: string;
    id_rol:number;
    rol:any;
    photo:string | File;
    address: string;
    birthday: string;
    cart:any[];
    orders:any[];
    constructor(){
        this.name=null;
        this.email=null;
        this.password=null;
        this.password_confirmation=null;
        this.id_rol=null;
        this.rol=null;
        this.photo=null;
        this.address=null;
        this.birthday=null;
        this.cart=[];
        this.orders=[];
    }
}