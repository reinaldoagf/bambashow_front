import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

var misc: any = {
  sidebar_mini_active: true
};

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/admin/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "ni-shop text-primary",
  },{
    path: "/admin/user-manager",
    title: "Gestor de usuarios",
    type: "sub",
    icontype: "ni-collection text-orange",
    collapse: "examples",
    isCollapsed: true,
    children: [
      {path: "users", title: "Usuarios", type: "link"},
      {path: "roles", title: "Roles", type: "link"},
      /* {
        path: "budget-expenses", 
        title: "Contabilidad",//"Presupuesto gastos", 
        type: "sub",
        collapse: "examples",
        isCollapsed: true,
        children: [
          {path: "invoice-income", title: "Ingreso factura", type: "link"},       
        ]
      } */
    ]
  },
  /* {
    path: "/admin/evaluation",
    title: "Evaluación",
    type: "sub",
    icontype: "ni-ungroup text-orange",
    collapse: "examples",
    isCollapsed: true,
    children: [
      { 
        path: "store-evaluations", 
        title: "Comercial", 
        type: "link" 
      },//Individual
      // { path: "store-evaluations-operation", title: "Operación", type: "link" },
      { 
        path: "store-evaluations", 
        title: "Operación", 
        type: "sub",
        collapse: "examples",
        isCollapsed: true,
        children: [
          { path: "accounting", title: "Contabilidad", type: "link" },//Contabilidad
          { path: "inventory", title: "Inventario", type: "link" },//Inventario
          { path: "management", title: "Gestión", type: "link" },//Gestión
          { path: "cd-management", title: "Gestión CD", type: "link" },//Gestión CD
        ]
      },
    ]
  },
  {
    path: "/admin/settings",
    title: "Configuración",
    type: "sub",
    icontype: "ni-ui-04 text-info",
    collapse: "components",
    isCollapsed: true,
    children: [
      { path: "individual-module", title: "Módulo Comercial", type: "link" },
      { path: "operational-modules", title: "Módulos Operación", type: "link" },
      { path: "users", title: "Usuarios", type: "link" },
      { path: "rols", title: "Roles", type: "link" },
      { path: "emails", title: "Emails", type: "link" },
      { path: "sap-connection", title: "Conexión SAP", type: "link" },
    ]
  },  *//* {
    path: "/admin/custom-fields",
    title: "Campos personalizados",
    type: "sub",
    icontype: "ni-settings-gear-65 text-info",
    isCollapsed: true,
    children: [
      { path: "store-configuration", title: "Tiendas", type: "link" }, //(pim)
    ]
  } */
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.getUser();
  }
  /*obtiene usuario en sesión desde localStorage*/
  getUser(){
    const user=JSON.parse(localStorage.getItem("user"));
    if(user){
      /* this.menuItems = ROUTES.filter(menuItem =>{
        if(user.rol && user.rol.menu_elements_rol.find(e => e.menu_element.path == menuItem.path)){
          return menuItem
        }
      }); */
      this.menuItems = ROUTES;
      console.log('menuItems:',this.menuItems)
      this.router.events.subscribe(event => {
        this.isCollapsed = true;
      });
    }
  }
  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }
  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }
  minimizeSidebar() {
    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }
}
