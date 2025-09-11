import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserDataService } from '../user-data-service/user-data-service';
import { User } from '../../stores/users.store';

@Injectable()
export class UserUiService {
  constructor(
    private modal: NzModalService,
    private userService: UserDataService
  ) {}

  confirmDelete(user: User) {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete ${user.name}?`,
      nzOkText: 'Yes',
      nzOkDanger: true,
      nzOnOk: () => this.userService.deleteUser(user.id),
      nzCancelText: 'No',
    });
  }

  confirmRoleChange(user: User, newRole: User['role']) {
    this.modal.confirm({
      nzTitle: `Are you sure you want to change ${user.name}'s role to ${newRole}?`,
      nzOkText: 'Yes',
      nzOnOk: () => this.userService.editUser({ ...user, role: newRole }),
      nzCancelText: 'No',
    });
  }
}
