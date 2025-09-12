import { Injectable, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PersistenceService } from '../../shared/services/persistence-service/persistence-service';
import { ignoreElements, map, Observable, tap } from 'rxjs';
import { BookStoreAbstraction } from './book-store-abstraction';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: Date;
  author_id: number;
  tags?: string[];
}

export interface BookState {
  books: Book[];
  contextBook: Book | null;
}

const STORAGE_KEY = 'books-state';

@Injectable({
  providedIn: 'root',
})
export class BookStore
  extends ComponentStore<BookState>
  implements OnDestroy, BookStoreAbstraction
{
  readonly books$ = this.select((state) => state.books);
  readonly contextBook$ = this.select((s) => s.contextBook);

  readonly booksByAuthor$ = this.books$.pipe(
    map((books) => {
      // i learned this at my interview :)
      const map = new Map<number, Book[]>();

      for (const book of books) {
        const existing = map.get(book.author_id) ?? [];
        existing.push(book);
        map.set(book.author_id, existing);
      }

      return map;
    })
  );

  constructor(private persistenceService: PersistenceService) {
    super(
      persistenceService.get<BookState>(STORAGE_KEY) ?? {
        books: [
          {
            id: 1,
            title: 'harry potter and the sorcerers stone',
            author: 'J.K. Rowling',
            publishedDate: new Date('1997-06-26'),
            author_id: 1,
            tags: ['science fiction', 'young adult'],
          },
        ],
        contextBook: null,
      }
    );

    this.persistBooks(this.books$);
  }

  readonly addBook = this.updater((state, newBook: Omit<Book, 'id'>) => {
    const nextId = this.getNextId(state.books);
    const bookWithId: Book = { ...newBook, id: nextId };

    return {
      ...state,
      books: [...state.books, bookWithId],
    };
  });

  readonly deleteBook = this.updater((state, book: Book) => ({
    ...state,
    books: state.books.filter((b) => b.id !== book.id),
  }));

  readonly editBook = this.updater((state, book: Book) => ({
    ...state,
    books: state.books.map((b) => (b.id === book.id ? book : b)),
  }));

  readonly setContextBook = this.updater((state, book: Book | null) => ({
    ...state,
    contextBook: book,
  }));

  readonly persistBooks = this.effect((books$: Observable<Book[]>) =>
    books$.pipe(
      tap((books) => this.persistenceService.save(STORAGE_KEY, { books })),
      ignoreElements()
    )
  );

  // todo : logic is wack
  private getNextId(books: Book[]): number {
    if (books.length === 0) return 1;
    return Math.max(...books.map((b) => b.id)) + 1;
  }
}
