import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "number-custom" })
export class NumberCustomPipe implements PipeTransform {
  constructor() { }

  transform(value: number | string, maxSize: number): string {

    if (typeof value == "number") {
      value = String(value);
    }

    if (value.length > maxSize) { value = value.substr(0, maxSize); }

    return value;
  }

}