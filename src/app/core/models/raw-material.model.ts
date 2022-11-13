import { Provider } from "@angular/core";

export class RawMaterial {
    id: number;
    name: string;
    quantity: number;
    constructor(){
        this.name=null;
        this.quantity=null;
    }
}