import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data-service/user-data-service';

export type UserRole = 'admin' | 'user' | 'writer';

@Component({
  selector: 'app-add-user-form',
  standalone: false,
  templateUrl: './add-user-form.html',
  styleUrl: './add-user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserForm implements OnInit {

  @Output() onClose = new EventEmitter<void>();

  roles: UserRole[] = ['admin', 'user', 'writer'];
  form!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserDataService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: [null, [Validators.required, Validators.min(18)]],
      role: ['user', Validators.required],
    });
  }

  submit() {

    if (this.form.valid) {
      this.userService.addUser(this.form.value);
      this.form.reset();
      this.onClose.emit();
    }
  }

  // todo : make this reuseable

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'This field is required';
    if (control.errors['minlength'])
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    if (control.errors['maxlength'])
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    if (control.errors['min']) return `Must be at least ${control.errors['min'].min}`;
    if (control.errors['max']) return `Value cannot exceed ${control.errors['max'].max}`;

    return 'Invalid value';
  }
}
