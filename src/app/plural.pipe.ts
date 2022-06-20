import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {

  transform(input: number, customPluralForm: string = "e"): string {
    return input > 1 ? customPluralForm : "";
  }

}
