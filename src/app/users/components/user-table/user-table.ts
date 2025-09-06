import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User, UsersStore } from '../../stores/users.store';
import { UserDataService } from '../../services/user-data-service/user-data-service';
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

  constructor(
    public usersStore: UsersStore,
    private nzContextMenuService: NzContextMenuService,
    private userService: UserDataService
  ) {
    this.users$ = this.usersStore.users$;
  }

  contextMenu(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
    user: User
  ): void {
    console.log(`setting context user to ${user.name}`);
    this.userService.setContextUser(user);
    this.nzContextMenuService.create($event, menu);
  }
}
