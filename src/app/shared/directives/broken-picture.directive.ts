import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[brokenPicture]'
})
export class BrokenPictureDirective {
  @Input() urlCustom: string
  constructor(private elementRef: ElementRef) {}


  @HostListener('error')
  loadDefaultImage() {
    const element = this.elementRef.nativeElement
    element.src = this.urlCustom || `https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg`
  }

}
