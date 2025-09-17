import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Book } from '../../../books/stores/book-store';
import { User } from '../../stores/users.store';
import { USER_STORE, UserStoreAbstraction } from '../../stores/user-store-abstraction';
import { BOOK_STORE, BookStoreAbstraction } from '../../../books/stores/book-store-abstraction';

@Component({
  selector: 'app-user-books',
  standalone: false,
  templateUrl: './user-books.component.html',
  styleUrl: './user-books.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserBooksComponent {
  books$!: Observable<Book[]>;

  constructor(@Inject(BOOK_STORE) private bookStore: BookStoreAbstraction , @Inject(USER_STORE) public userStore: UserStoreAbstraction,) {}

  ngOnInit() {
    this.books$ = this.userStore.contextUser$.pipe(
      switchMap((contextUser: User | null) => {
        if (!contextUser) {
          return [];
        }
        return this.bookStore.booksByAuthor$.pipe(
          map((map) => {
            const books = map.get(contextUser.id) ?? [];
            return books;
          })
        );
      })
    );
  }
}
