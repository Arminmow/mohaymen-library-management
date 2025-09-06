import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  standalone: false,
  templateUrl: './generic-modal.html',
  styleUrl: './generic-modal.scss',
})
export class GenericModal {
  @Input() title: string = '';
  @Input() triggerText: string = '';

  isVisible: boolean = false;

  showModal() {
    this.isVisible = true;
  }

  hideModal() {
    this.isVisible = false;
  }
}
