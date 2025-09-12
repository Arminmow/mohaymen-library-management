import { Inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User } from '../../stores/users.store';
import { ModalServiceAbstraction } from '../abstractions/modal-service-abstraction';
import { USER_DATA_SERVICE, UserDataServiceAbstraction } from '../abstractions/user-data-service-abstraction';

@Injectable()
export class UserUiService implements ModalServiceAbstraction{
  constructor(
    private modal: NzModalService,
     @Inject(USER_DATA_SERVICE) private userDataService: UserDataServiceAbstraction
  ) {}

  confirmDelete(user: User) {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete ${user.name}?`,
      nzOkText: 'Yes',
      nzOkDanger: true,
      nzOnOk: () => this.userDataService.deleteUser(user.id),
      nzCancelText: 'No',
    });
  }

  confirmRoleChange(user: User, newRole: User['role']) {
    this.modal.confirm({
      nzTitle: `Are you sure you want to change ${user.name}'s role to ${newRole}?`,
      nzOkText: 'Yes',
      nzOnOk: () => this.userDataService.editUser({ ...user, role: newRole }),
      nzCancelText: 'No',
    });
  }
}
