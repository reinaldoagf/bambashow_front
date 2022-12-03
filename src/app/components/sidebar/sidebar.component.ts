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
    icontype: "ni-chart-bar-32 text-primary",
  }, {
    path: "/admin/pages-manager",
    title: "Gestión de páginas",
    type: "sub",
    icontype: "ni-calendar-grid-58 text-info",
    collapse: "examples",
    isCollapsed: true,
    children: [
      { path: "home", title: "Inicio", type: "link" },
    ]
  }, {
    path: "/admin/user-manager",
    title: "Gestión de usuarios",
    type: "sub",
    icontype: "ni-circle-08 text-info",
    collapse: "examples",
    isCollapsed: true,
    children: [
      { path: "users", title: "Usuarios", type: "link" },
      { path: "roles", title: "Roles", type: "link" },
    ]
  }, {
    path: "/admin/supplier-manager",
    title: "Gestión de proveedores",
    type: "sub",
    icontype: "ni-collection text-success",
    collapse: "examples",
    isCollapsed: true,
    children: [
      { path: "providers", title: "Proveedores", type: "link" },
      { path: "orders", title: "Pedidos", type: "link" },
    ]
  }, {
    path: "/admin/product-manager",
    title: "Gestión de productos",
    type: "sub",
    icontype: "ni-money-coins text-danger",
    collapse: "examples",
    isCollapsed: true,
    children: [
      { path: "raw-material", title: "Materia prima", type: "link" },
      { path: "categories", title: "Categorías", type: "link" },
      { path: "products", title: "Productos", type: "link" },
      { path: "orders", title: "Pedidos", type: "link" },
    ]
  }, {
    path: "/admin/human-resources-manager",
    title: "Gestión de recursos humanos",
    type: "sub",
    icontype: "ni-badge text-warning",
    collapse: "examples",
    isCollapsed: true,
    children: [
    ]
  }, {
    path: "/admin/finance-manager",
    title: "Gestión de finanzas",
    type: "sub",
    icontype: "ni-chart-bar-32 text-info",
    collapse: "examples",
    isCollapsed: true,
    children: [
    ]
  }];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getUser();
  }
  /*obtiene usuario en sesión desde localStorage*/
  getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      /* this.menuItems = ROUTES.filter(menuItem =>{
        if(user.rol && user.rol.menu_elements_rol.find(e => e.menu_element.path == menuItem.path)){
          return menuItem
        }
      }); */
      this.menuItems = ROUTES;
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
