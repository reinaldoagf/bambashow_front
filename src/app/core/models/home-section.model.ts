export class HomeSection {
    id: number;
    key:string;
    theme:string;
    icon_side:string;
    icon_side_theme:string;
    title_side:string;
    description_side:string;
    image_side:string | File;
    title:string;
    description:string;
    active:boolean;
    separator_bottom:string;
    list_items:any[];
    constructor(){
        this.id=null;
        this.key=null;
        this.theme=null;
        this.icon_side=null;
        this.icon_side_theme=null;
        this.title_side=null;
        this.description_side=null;
        this.image_side=null;
        this.title=null;
        this.description=null;
        this.active=null;
        this.separator_bottom=null;
        this.list_items=[];
    }
}