import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../stores/users.store';

@Component({
  selector: 'app-edit-user-modal',
  standalone: false,
  templateUrl: './edit-user-modal.html',
  styleUrl: './edit-user-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserModal {

  @Input() user!: User;

  isVisible: boolean = false;

  showModal() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }
}
