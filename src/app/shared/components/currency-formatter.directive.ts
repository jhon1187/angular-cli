import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { CurrencyPipe } from "./currency.pipe";

@Directive({ selector: "[currencyFormatter]" })
export class CurrencyFormatterDirective implements OnInit {

    private el: HTMLInputElement;

    constructor(
        private elementRef: ElementRef,
        private currencyPipe: CurrencyPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        if (this.el.value) {
            this.el.value = this.currencyPipe.transform(this.el.value);
        }
    }

    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        if (this.el.value) {
            this.el.value = this.currencyPipe.parse(value);
        }
    }

    // @HostListener("ngModelChange", ["$event"])
    // onChange(value) {
    //     if (this.el.value) {
    //         this.el.value = this.currencyPipe.transform(value);
    //     }
    // }

    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        if (this.el.value) {
            this.el.value = this.currencyPipe.transform(value);
        }
    }

}