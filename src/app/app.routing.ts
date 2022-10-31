import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";

import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

/* 
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
 */
const routes: Routes = [
  {
    path: "",
    redirectTo: "main/login",
    pathMatch: "full"
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [{
      path: "dashboard",
      component: DashboardComponent,
    },
  ]
  },
  {
    path: "main",
    component: MainLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "signup",
        component: SignupComponent,
      },
      {
        path: "landing",
        component: LandingComponent,
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
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
