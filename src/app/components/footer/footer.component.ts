import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestService } from 'src/app/core/services/rest.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    test : Date = new Date();
    social_networks: any[] = [];
    constructor(
      private spinner: NgxSpinnerService,
      private restService: RestService,
      private router: Router) { }
    get getPath(){
      return this.router?.url ? this.router.url : null;
    }
    ngOnInit() {
      this.getData()
  }
  async getData() {
    try {
      this.spinner.show();
      const [
        response1,
      ]: any[] = await Promise.all([
        this.restService.get(`/settings/social-networks`),
      ]);
      this.spinner.hide();
      this.social_networks = response1.data?.social_networks ? response1.data.social_networks : [];
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
}
