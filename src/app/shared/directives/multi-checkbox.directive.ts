import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[multiCheckbox]'
})
export class MultiCheckboxDirective implements OnInit {
    public checked:boolean = false;
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2) {
    }
    ngOnInit() { }
    @HostListener('click', ['$event']) onClick($event){
        $event.preventDefault();
        this.checked = !this.checked;
        this.checked ?
            this.renderer.removeClass(this.elementRef.nativeElement.children[2], 'invisible')  :
            this.renderer.addClass(this.elementRef.nativeElement.children[2], 'invisible');
        // this.elementRef.nativeElement.children[1].checked=this.checked
        this.renderer.setProperty(this.elementRef.nativeElement.children[1], 'checked', this.checked);
        // console.log("this.elementRef.nativeElement.children[1].checked:",this.elementRef.nativeElement.children[1].checked)
        // console.log("this.elementRef.nativeElement.children[1]:",this.elementRef.nativeElement.children[1])
    }
}