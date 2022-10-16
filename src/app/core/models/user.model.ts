export class User {
    _id: string;
    name: string;
    email: string;
    password:string;
    password_confirmation: string;
    rol:any;
    signature_photo:string | File;
    special_key_sign:string;
    stores_daterange:any;
    user_type:any;
    stores:any[];
    constructor(){
        this.name=null;
        this.email=null;
        this.password=null;
        this.password_confirmation=null;
        this.rol=null;
        this.signature_photo=null;
        this.special_key_sign=null;
        this.stores_daterange=null;
        this.user_type=null;
        this.stores=[];
    }
}