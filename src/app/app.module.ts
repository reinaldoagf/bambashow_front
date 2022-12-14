import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core/core.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, MainLayoutComponent, AuthLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule,
    AppRoutingModule,
    ComponentsModule,
    CoreModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
