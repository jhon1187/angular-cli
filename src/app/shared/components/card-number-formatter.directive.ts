import { Directive, HostListener, ElementRef, OnInit, Input } from "@angular/core";
import { CardNumberCustomPipe } from "./card-number-custom.pipe";

@Directive({ selector: "[cardNumberFormatter]" })
export class CardNumberFormatterDirective implements OnInit {

    private el: HTMLInputElement;

    constructor(
        private elementRef: ElementRef,
        private customPipe: CardNumberCustomPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        if (this.el.value) {
            this.el.value = this.customPipe.transform(this.el.value);
        }
    }

    @HostListener('keyup', ['$event'])
    keyboardInput(event) {
        if (this.el.value) {
            this.el.value = this.customPipe.transform(this.el.value);
        }
    }

    // @HostListener("ngModelChange", ["$event"])
    // onChange(value) {
    //     if (this.el.value) {
    //         this.el.value = this.currencyCustomPipe.transform(value);
    //     }
    // }

}