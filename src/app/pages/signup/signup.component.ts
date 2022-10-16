import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { User } from 'src/app/core/models/user.model';
import { RestService } from "src/app/core/services/rest.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  test: Date = new Date();
  focus;
  focus1;
  focus2;
  constructor(public spinner: NgxSpinnerService,
    public router: Router,
    public restService: RestService,
    public notificationService: NotificationService,) { }

  ngOnInit() { }
  async signUp() {
    this.spinner.show();
    this.restService.post(`/auth/signup`, this.user)
      .then((response: any) => {
        this.spinner.hide();
        console.log('response:', response)
        if (response != undefined && response.data) {
          this.notificationService.showSuccess('Operación realiza exitosamente', 'Inicio de sesión exitoso')
          localStorage.setItem('access_token', response.data.token);
          localStorage.setItem('expires_in', `${response.data.exp}`);
          localStorage.setItem('user', JSON.stringify(response.data));
          this.router.navigate(['/admin/']);
        }
      })
      .catch(err => {
        this.spinner.hide();
        console.log("err:", err)
      });
  }
}
