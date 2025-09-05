import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { UserService } from '../../services/user-service';
import { User } from '../../stores/users.store';

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

  constructor(private userService: UserService) {}

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
