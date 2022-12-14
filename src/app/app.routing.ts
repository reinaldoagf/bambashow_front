import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { HomeComponent } from './pages/home/home.component';
import { ProductOrderFormComponent } from './pages/product-order-form/product-order-form.component';
import { ProductsComponent } from './pages/products/products.component';

/* 
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
 */
const routes: Routes = [
  {
    path: "",
    redirectTo: "main/home", // /main/home | /auth/login
    pathMatch: "full"
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [{
      path: "dashboard",
      loadChildren: () => import('./pages/dashboard/dashboard.module').then(x => x.DashboardModule),
    },{
      path: "my-orders",
      loadChildren: () => import('./pages/my-orders/my-orders.module').then(x => x.MyOrdersModule),
    }, {
      path: "user-manager",
      loadChildren: () => import('./pages/user-manager/user-manager.module').then(x => x.UserManagerModule),
    }, {
      path: "supplier-manager",
      loadChildren: () => import('./pages/supplier-manager/supplier-manager.module').then(x => x.SupplierManagerModule),
    },{
      path: "product-manager",
      loadChildren: () => import('./pages/product-manager/product-manager.module').then(x => x.ProductManagerModule),
    },{
      path: "pages-manager",
      loadChildren: () => import('./pages/pages-manager/pages-manager.module').then(x => x.PagesManagerModule),
    },{
      path: "settings",
      loadChildren: () => import('./pages/settings/settings.module').then(x => x.SettingsModule),
    },
  ]
  },
  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "signup",
        component: SignupComponent,
      },
    ]
  },
  {
    path: "main",
    component: MainLayoutComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "product-order-form",
        component: ProductOrderFormComponent,
      },
      {
        path: "products",
        component: ProductsComponent,
      },
    ]
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
