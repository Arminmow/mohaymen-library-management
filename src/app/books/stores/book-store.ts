import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: Date;
}

export interface BookState {
  books: Book[];
}

@Injectable({
  providedIn: 'root',
})
export class BookStore extends ComponentStore<BookState> {
  constructor() {
    super({
      books: [],
    });
  }

  readonly books$ = this.select((state) => state.books);

  readonly addBook = this.updater((state, book: Book) => ({
    ...state,
    books: [...state.books, book],
  }));

  readonly deleteBook = this.updater((state, book: Book) => ({
    ...state,
    books: state.books.filter((b) => b.id !== book.id),
  }));
}
