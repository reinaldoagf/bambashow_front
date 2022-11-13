import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { User } from 'src/app/core/models/user.model';
import { RestService } from "src/app/core/services/rest.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: User = new User();
  focus: boolean = false;
  focus1: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private restService: RestService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.removeLocalStorageItems();
  }
  removeLocalStorageItems() {
    localStorage.clear();
  }
  async login() {
    this.spinner.show();
    this.restService.post(`/auth/login`,this.user)
      .then((response: any)=> {
        this.spinner.hide();
        if (response != undefined && response.data) {
          localStorage.setItem('access_token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.notificationService.showSuccess('Operación realiza exitosamente', response.data.message)
          this.router.navigate(['/admin/dashboard']);
        }
      })
      .catch(err => {
        this.spinner.hide();
        console.log("err:", err)
      });
  }
}
