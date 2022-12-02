import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestService } from 'src/app/core/services/rest.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
    focus: any;
    focus1: any;
    sections: any[] = []
    constructor(
        private spinner: NgxSpinnerService,
        private restService: RestService,) { }
    ngOnInit() {
        this.getData()
    }
    async getData() {
      try {
        this.spinner.show();
        const [
          response1,
        ]: any[] = await Promise.all([
          this.restService.get(`/landing/sections`),
        ]);
        this.spinner.hide();
        this.sections = response1.data ? response1.data : [];
      } catch (error) {
        this.spinner.hide();
        console.log(error);
      }
    }
}
