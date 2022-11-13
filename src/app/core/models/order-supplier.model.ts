import { Provider } from "@angular/core";

export class OrderSupplier {
    id: number;
    provider: Provider;
    message: string;
    pdf: string;
    status: string;
    constructor(){
        this.message=null;
        this.pdf=null;
        this.status=null;
    }
}