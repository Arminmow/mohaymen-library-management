import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UsersStore } from '../../stores/users.store';

@Component({
  selector: 'app-user-table',
  standalone: false,
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTable {
  users$: Observable<User[]>;

  constructor(private usersStore: UsersStore) {
    this.users$ = this.usersStore.users$;
  }
}
