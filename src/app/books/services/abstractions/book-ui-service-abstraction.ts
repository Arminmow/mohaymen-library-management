import { InjectionToken } from '@angular/core';
import { Book } from '../../stores/book-store';

export interface BookUiServiceAbstraction {
  confirmDelete(book: Book): void;
}

export const BOOK_UI_SERVICE = new InjectionToken<BookUiServiceAbstraction>(
  'BOOK_UI_SERVICE'
);
