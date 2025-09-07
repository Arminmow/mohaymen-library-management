import { Injectable, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PersistenceService } from '../../shared/services/persistence-service/persistence-service';
import { Subscription } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: Date;
}

export interface BookState {
  books: Book[];
}

const STORAGE_KEY = 'books-state';

@Injectable({
  providedIn: 'root',
})
export class BookStore extends ComponentStore<BookState> implements OnDestroy {
  private subscription: Subscription;

  constructor(private persistenceService: PersistenceService) {
    super(
      persistenceService.get<BookState>(STORAGE_KEY) ?? {
        books: [
          {
            id: 1,
            title: 'harry potter and the sorcerers stone',
            author: 'J.K. Rowling',
            publishedDate: new Date('1997-06-26'),
          },
        ],
      }
    );

    this.subscription = this.books$.subscribe((books) => {
      this.persistenceService.save(STORAGE_KEY, { books });
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

  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
