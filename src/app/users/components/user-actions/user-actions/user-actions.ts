import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { User } from '../../../stores/users.store';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-user-actions',
  standalone: false,
  templateUrl: './user-actions.html',
  styleUrl: './user-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserActions {
  @Input() contextUser!: User;

  @ViewChild('menu', { static: true, read: NzDropdownMenuComponent })
  public menu!: NzDropdownMenuComponent;

  constructor(private userService: UserService) {}

  showDeleteConfirm() {
    this.userService.confirmDelete(this.contextUser);
  }

  editUser(user: User): void {
    console.log('Editing user:', user);
  }
}
