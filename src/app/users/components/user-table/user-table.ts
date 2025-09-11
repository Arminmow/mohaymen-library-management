import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User, UsersStore } from '../../stores/users.store';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import {
  USER_DATA_SERVICE,
  UserDataServiceAbstraction,
} from '../../services/abstractions/user-data-service-abstraction';

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
    @Inject(USER_DATA_SERVICE)
    private userDataService: UserDataServiceAbstraction
  ) {
    this.users$ = this.usersStore.users$;
  }

  contextMenu(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
    user: User
  ): void {
    this.userDataService.setContextUser(user);
    this.nzContextMenuService.create($event, menu);
  }
}
