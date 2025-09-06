import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { User, UsersStore } from '../../stores/users.store';
import { UserUiService } from '../../services/user-ui-service/user-ui-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-actions',
  standalone: false,
  templateUrl: './user-actions.html',
  styleUrl: './user-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserActions {
  private readonly allRoles = ['user', 'admin', 'writer'];

  @ViewChild('menu', { static: true, read: NzDropdownMenuComponent })
  public menu!: NzDropdownMenuComponent;

  contextUser!: User | null;

  constructor(
    private userService: UserUiService,
    private userStore: UsersStore
  ) {
    this.userStore.contextUser$.subscribe((user) => (this.contextUser = user));
  }

  get roleOptions(): User['role'][] {
    if (!this.contextUser) return [];
    return this.allRoles.filter(
      (role) => role !== this.contextUser?.role
    ) as User['role'][];
  }

  showDeleteConfirm() {
    if (this.contextUser) this.userService.confirmDelete(this.contextUser);
  }

  editUser(user: User): void {
    console.log('Editing user:', user);
  }

  onChangeRole(newRole: User['role']) {
    if (this.contextUser)
      this.userService.confirmRoleChange(this.contextUser, newRole);
  }
}
