import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Book, BookStore } from '../../../books/stores/book-store';
import { User, UsersStore } from '../../stores/users.store';

@Component({
  selector: 'app-user-books',
  standalone: false,
  templateUrl: './user-books.html',
  styleUrl: './user-books.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserBooks {
  books$!: Observable<Book[]>;

  constructor(private bookStore: BookStore , private userStore : UsersStore) {}

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
