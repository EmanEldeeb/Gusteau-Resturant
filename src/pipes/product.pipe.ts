import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product',
  standalone: true,
})
export class ProductPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
