import { User } from "../models/user.model";

export class OrderProduct {
    id: number;
    status: any;
    id_user: number;
    user: User;
    details:any[];
    payments:any[];
    constructor(){
        this.id=null;
        this.status=null;
        this.id_user=null;
        this.user=null;
        this.details=[];
        this.payments=[{
            id:null,
            code:null,
            amount:null,
            description:null,
            image:null,
            id_order_product:null,
        }];
    }
}