import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secToMin'
})
export class SecToMinPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return this.twoDigits(Math.floor(value/60)) + ':' + this.twoDigits(value%60);
  }

  private twoDigits(num: number) {
    return num >=10 ? num : '0'+num;
  }

}
