export class Rol {
    id: string;
    name: string;
    description: string;
    menu_elements_rol: any[];
    constructor(){
        this.name=null;
        this.description=null;
        this.menu_elements_rol=[]
    }
}