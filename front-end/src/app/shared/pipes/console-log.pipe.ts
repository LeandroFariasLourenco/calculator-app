import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consoleLog'
})
export class ConsoleLogPipe implements PipeTransform {
  constructor() { }

  transform(value: any): void {
    return console.log(value);
  }
}
