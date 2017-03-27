import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "card-number-custom" })
export class CardNumberCustomPipe implements PipeTransform {
  constructor() { }

  transform(value: number | string): string {

    if (typeof value == "number") {
      value = String(value);
    }

    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{4})(\d)/g, "$1 $2");
    value = value.replace(/^(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3");
    value = value.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3 $4");

    if (value.length > 19) { value = value.substr(0, 19); }

    return value;
  }

}