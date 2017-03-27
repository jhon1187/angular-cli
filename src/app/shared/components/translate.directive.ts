import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";

declare var $: any;

@Directive({ selector: "[translate]" })
export class TranslateDirective implements OnInit {

    private el: HTMLInputElement;

    constructor(
        private elementRef: ElementRef
    ) {
        this.el = this.elementRef.nativeElement;
    }

    private translate(text) {
        return $.i18n.prop(text);
    }

    ngOnInit() {
        if (this.el.textContent) {
            this.el.textContent = this.translate(this.el.textContent);
        }
    }

    // ngAfterViewChecked() {
    //     if (this.el.textContent) {
    //         this.el.textContent = this.translate(this.el.textContent);
    //     }
    // }

    ngAfterViewInit() {
        if (this.el.textContent) {
            this.el.textContent = this.translate(this.el.textContent);
        }
    }

}