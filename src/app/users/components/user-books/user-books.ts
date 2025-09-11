import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Book, BookStore } from '../../../books/stores/book-store';
import { User } from '../../stores/users.store';
import { USER_STORE, UserStoreAbstraction } from '../../stores/user-store-abstraction';

@Component({
  selector: 'app-user-books',
  standalone: false,
  templateUrl: './user-books.html',
  styleUrl: './user-books.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserBooks {
  books$!: Observable<Book[]>;

  constructor(private bookStore: BookStore , @Inject(USER_STORE) public userStore: UserStoreAbstraction,) {}

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
