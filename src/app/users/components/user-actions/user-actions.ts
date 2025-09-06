import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { User } from '../../stores/users.store';
import { UserUiService } from '../../services/user-ui-service/user-ui-service';

@Component({
  selector: 'app-user-actions',
  standalone: false,
  templateUrl: './user-actions.html',
  styleUrl: './user-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserActions {
  @Input() contextUser!: User;

  private readonly allRoles = ['user', 'admin', 'writer'];

  @ViewChild('menu', { static: true, read: NzDropdownMenuComponent })
  public menu!: NzDropdownMenuComponent;

  constructor(private userService: UserUiService) {}

  get roleOptions(): User['role'][] {
    if (!this.contextUser) return [];
    return this.allRoles.filter(
      (role) => role !== this.contextUser.role
    ) as User['role'][];
  }

  showDeleteConfirm() {
    this.userService.confirmDelete(this.contextUser);
  }

  editUser(user: User): void {
    console.log('Editing user:', user);
  }

  onChangeRole(newRole: User['role']) {
    this.userService.confirmRoleChange(this.contextUser, newRole);
  }
}
