import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";

import $ from "jquery";

@Directive({ selector: "[translate]" })
export class TranslateDirective implements OnInit {

    private el: HTMLLabelElement;

    constructor(
        private elementRef: ElementRef
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.el.textContent;
        

    //    console.info($.i18n.prop("BOLETO"));

    console.info($.i18n);

        // if (this.el.textContent) {
        //     this.el.textContent = i18n(this.el.textContent);
        // }
    }

}