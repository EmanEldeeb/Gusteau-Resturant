import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(list: any[], term: string): any[] {
    return list.filter((ele) =>
      console.log(
        'from Pipe',
        ele.title?.toLowerCase().includes(term.toLowerCase())
      )
    );
  }
}
