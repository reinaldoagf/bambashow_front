import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
//services
import { NotificationService } from './services/notification.service';
import { RestService } from './services/rest.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    NotificationService,
    RestService,
  ]
})
export class CoreModule { }
