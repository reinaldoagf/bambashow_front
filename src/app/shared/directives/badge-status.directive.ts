import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[badgeStatus]'
})
export class BadgeStatusDirective implements OnInit {
    @Input() status: string
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2) {
    }
    ngOnInit() {
        const customClass = 'badge badge-pill text-uppercase';
        // 'en espera', 'aprobado', 'recibido', 'rechazado'
        switch (this.status) {
            case 'en espera':
                this.renderer.setAttribute(this.elementRef.nativeElement, 'class', `${customClass} badge-warning`);
                break;
            case 'aprobado':
                this.renderer.setAttribute(this.elementRef.nativeElement, 'class', `${customClass} badge-success`);
                break;
            case 'recibido':
                this.renderer.setAttribute(this.elementRef.nativeElement, 'class', `${customClass} badge-primary`);
                break;
            case 'rechazado':
                this.renderer.setAttribute(this.elementRef.nativeElement, 'class', `${customClass} badge-danger`);
                break;
            default:
                this.renderer.setAttribute(this.elementRef.nativeElement, 'class', `${customClass} badge-primary`);
                break;
        }
    }
}