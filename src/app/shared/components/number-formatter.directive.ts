import { Directive, HostListener, ElementRef, OnInit, Input } from "@angular/core";
import { NumberCustomPipe } from "./number-custom.pipe";

@Directive({ selector: "[numberFormatter]" })
export class NumberFormatterDirective implements OnInit {

    private el: HTMLInputElement;

    @Input() maxsize: number;

    constructor(
        private elementRef: ElementRef,
        private customPipe: NumberCustomPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        if (this.el.value) {
            this.el.value = this.customPipe.transform(this.el.value, this.maxsize);
        }
    }

    @HostListener('keyup', ['$event'])
    keyboardInput(value) {
        if (this.el.value) {
            this.el.value = this.customPipe.transform(this.el.value, this.maxsize);
        }
    }

    // @HostListener("ngModelChange", ["$event"])
    // onChange(value) {
    //     if (this.el.value) {
    //         this.el.value = this.currencyCustomPipe.transform(value);
    //     }
    // }

}