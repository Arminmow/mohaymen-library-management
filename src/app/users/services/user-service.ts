import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UsersStore, User } from '../stores/users.store';

@Injectable()
export class UserService {
  constructor(private modal: NzModalService, private usersStore: UsersStore) {}

  private editUser(user: User) {
    this.usersStore.updateUser(user);
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

  confirmRoleChange(user: User, newRole: User['role']) {
    this.modal.confirm({
      nzTitle: `Are you sure you want to change ${user.name}'s role to ${newRole}?`,
      nzOkText: 'Yes',
      nzOnOk: () => this.editUser({ ...user, role: newRole }),
      nzCancelText: 'No',
    });
  }

  addUser(newUser: User) {
    this.usersStore.addUser(newUser);
  }

  private deleteUser(userId: number) {
    this.usersStore.deleteUser(userId);
  }
}
