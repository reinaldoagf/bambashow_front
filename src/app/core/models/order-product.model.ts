import { User } from "../models/user.model";

export class OrderProduct {
    id: number;
    status: any;
    id_user: number;
    user: User;
    constructor(){
        this.id=null;
        this.status=null;
        this.id_user=null;
        this.user=null;
    }
}