import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { CurrencyCustomPipe } from "./currency-custom.pipe";

@Directive({ selector: "[currencyFormatter]" })
export class CurrencyFormatterDirective implements OnInit {

    private el: HTMLInputElement;

    constructor(
        private elementRef: ElementRef,
        private currencyCustomPipe: CurrencyCustomPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        if (this.el.value) {
            this.el.value = this.currencyCustomPipe.transform(this.el.value);
        }
    }

    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        if (this.el.value) {
            this.el.value = this.currencyCustomPipe.parse(value);
        }
    }

    // @HostListener("ngModelChange", ["$event"])
    // onChange(value) {
    //     if (this.el.value) {
    //         this.el.value = this.currencyCustomPipe.transform(value);
    //     }
    // }

    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        if (this.el.value) {
            this.el.value = this.currencyCustomPipe.transform(value);
        }
    }

}