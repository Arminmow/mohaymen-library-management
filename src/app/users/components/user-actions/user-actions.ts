import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';

import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { User } from '../../stores/users.store';
import { MODAL_ABSTRACTION, ModalServiceAbstraction } from '../../services/abstractions/modal-service-abstraction';

@Component({
  selector: 'app-user-actions',
  standalone: false,
  templateUrl: './user-actions.html',
  styleUrl: './user-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserActions {
  @Input() contextUser!: User | null;

  @ViewChild('menu', { static: true, read: NzDropdownMenuComponent })
  public menu!: NzDropdownMenuComponent;

  private readonly allRoles = ['user', 'admin', 'writer'];

  constructor(@Inject(MODAL_ABSTRACTION) private modalAbstraction: ModalServiceAbstraction) {}

  get roleOptions(): User['role'][] {
    if (!this.contextUser) return [];
    return this.allRoles.filter(
      (role) => role !== this.contextUser?.role
    ) as User['role'][];
  }

  showDeleteConfirm() {
    if (this.contextUser) this.modalAbstraction.confirmDelete(this.contextUser);
  }

  onChangeRole(newRole: User['role']) {
    if (this.contextUser)
      this.modalAbstraction.confirmRoleChange(this.contextUser, newRole);
  }
}
