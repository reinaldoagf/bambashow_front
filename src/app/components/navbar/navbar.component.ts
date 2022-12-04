import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { GuardService } from "src/app/core/services/guard.service";
import { RestService } from "src/app/core/services/rest.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    social_networks: any[] = [];

    constructor(public location: Location, private router: Router, private guardService: GuardService,
        private spinner: NgxSpinnerService,
        private restService: RestService,) {
    }
    get isLoggedIn() {
        return this.guardService.isLoggedIn();
    }
    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
     this.getData()
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/landing' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
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
