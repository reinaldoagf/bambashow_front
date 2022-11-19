import { Provider } from "@angular/core";

export class OrderSupplier {
    id: number;
    id_provider: number;
    provider: Provider;
    message: string;
    pdf: string;
    status: string;
    items: any[];
    constructor(){
        this.id=null;
        this.message=null;
        this.pdf=null;
        this.status=null;
        this.items=[{
            id_order_supplier:null,
            id_raw_material:null,
            quantity:null,
            square_meter:null
        }]
    }
}