import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book-store';

export interface BookStoreAbstraction {
  books$: Observable<Book[]>;
  contextBook$: Observable<Book | null>;
  booksByAuthor$: Observable<Map<number, Book[]>>;

  addBook(newBook: Omit<Book, 'id'>): void;
  deleteBook(book: Book): void;
  editBook(book: Book): void;
  setContextBook(book: Book | null): void;
}

export const BOOK_STORE = new InjectionToken<BookStoreAbstraction>(
  'BOOK_STORE'
);
