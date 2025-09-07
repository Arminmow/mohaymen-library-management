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
      books: [
        {
          id: 1,
          title: 'harry potter and the sorcerers stone',
          author: 'J.K. Rowling',
          publishedDate: new Date('1997-06-26'),
        },
      ],
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

  readonly editBook = this.updater((state, book: Book) => ({
    ...state,
    books: state.books.map((b) => (b.id === book.id ? book : b)),
  }));
}
