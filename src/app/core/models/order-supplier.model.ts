import { Provider } from "@angular/core";

export class OrderSupplier {
    id: number;
    id_provider: number;
    provider: Provider;
    message: string;
    pdf: string;
    status: string;
    constructor(){
        this.id=null;
        this.message=null;
        this.pdf=null;
        this.status=null;
    }
}