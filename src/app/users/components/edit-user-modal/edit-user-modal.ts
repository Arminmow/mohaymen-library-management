import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-user-modal',
  standalone: false,
  templateUrl: './edit-user-modal.html',
  styleUrl: './edit-user-modal.scss',
})
export class EditUserModal {
  isVisible: boolean = false;

  showModal() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }
}
