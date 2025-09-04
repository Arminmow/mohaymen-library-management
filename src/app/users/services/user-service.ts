import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UsersStore, User } from '../stores/users.store';

@Injectable()
export class UserService {
  constructor(private modal: NzModalService, private usersStore: UsersStore) {}

  editUser(user: User) {
    console.log('Editing user:', user);
    // could open modal, navigate, etc.
  }

  confirmDelete(user: User) {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete ${user.name}?`,
      nzOkText: 'Yes',
      nzOkDanger: true,
      nzOnOk: () => this.deleteUser(user.id),
      nzCancelText: 'No',
    });
  }

  private deleteUser(userId: number) {
    this.usersStore.deleteUser(userId);
  }
}
