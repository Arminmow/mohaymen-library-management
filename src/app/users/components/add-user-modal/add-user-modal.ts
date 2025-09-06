import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-user-modal',
  standalone: false,
  templateUrl: './add-user-modal.html',
  styleUrl: './add-user-modal.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class AddUserModal {
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
