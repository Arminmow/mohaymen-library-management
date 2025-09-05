import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../stores/users.store';

@Component({
  selector: 'app-edit-user-form',
  standalone: false,
  templateUrl: './edit-user-form.html',
  styleUrl: './edit-user-form.scss',
})
export class EditUserForm implements OnInit {

  @Input() user!: User;

  constructor(private fb: FormBuilder) {}

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.user?.name, [Validators.required, Validators.minLength(3)]],
      age: [this.user?.age, [Validators.required, Validators.min(18)]],
    });
  }

  submit() {
    if (this.form.valid) {
      // Handle form submission
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'This field is required';
    if (control.errors['minlength'])
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    if (control.errors['maxlength'])
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    if (control.errors['min'])
      return `Must be at least ${control.errors['min'].min}`;
    if (control.errors['max'])
      return `Value cannot exceed ${control.errors['max'].max}`;

    return 'Invalid value';
  }
}
