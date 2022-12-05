import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CommonModule } from '@angular/common';
//services
import { AdminNavbarService } from './services/admin-navbar.service';
import { GuardService } from './services/guard.service';
import { NotificationService } from './services/notification.service';
import { RestService } from './services/rest.service';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AdminNavbarService,
    GuardService,
    NotificationService,
    RestService,
    CartService,
  ]
})
export class CoreModule { }
