import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch(value) {
      case 37: return 'book';
      case 36: return 'menu_book';
      case 35: return 'library_books';
    }    
    return 'grade';
  }

}
