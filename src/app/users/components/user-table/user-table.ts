import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UsersStore } from '../../stores/users.store';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-user-table',
  standalone: false,
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTable {
  users$: Observable<User[]>;
  contextUser!: User;

  constructor(
    private usersStore: UsersStore,
    private nzContextMenuService: NzContextMenuService
  ) {
    this.users$ = this.usersStore.users$;
  }

  contextMenu(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
    user: User
  ): void {
    
    this.contextUser = user;
    this.nzContextMenuService.create($event, menu);
  }
}
