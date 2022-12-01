import { Component, OnInit, OnDestroy, Inject, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { filter, Subscription } from 'rxjs';

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;
@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private _router: Subscription;

  constructor( private renderer : Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any, private element : ElementRef, public location: Location) {}
  
  @HostListener('window:scroll', ['$event'])
  hasScrolled() {
    var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
      this.renderer.listen('window', 'scroll', (event) => {
          const number = window.scrollY;
          if (number > 150 || window.pageYOffset > 150) {
              navbar.classList.add('headroom--not-top');
          } else {
              navbar.classList.remove('headroom--not-top');
          }
      });
  };
  ngOnInit() {
    this.hasScrolled();
  }
  ngOnDestroy() {
  }
}
