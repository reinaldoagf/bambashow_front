import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

/* import { LandingModule } from './pages/landing/landing.module';
import { SignupModule } from './pages/signup/signup.module';
import { LoginModule } from './pages/login/login.module'; */
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, MainLayoutComponent],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule,
    AppRoutingModule,
    ToastrModule.forRoot({}),
    /* LandingModule,
    SignupModule,
    LoginModule, */
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
