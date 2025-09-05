import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';

export type UserRole = 'admin' | 'user' | 'writer';

@Component({
  selector: 'app-add-user-form',
  standalone: false,
  templateUrl: './add-user-form.html',
  styleUrl: './add-user-form.scss',
})
export class AddUserForm implements OnInit {
  roles: UserRole[] = ['admin', 'user', 'writer'];
  form!: FormGroup;

  constructor(private fb: FormBuilder , private userService : UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: [null, [Validators.required, Validators.min(18)]],
      role: ['user', Validators.required],
    });
  }

  submit() {
    console.log(this.form.value);

    if (this.form.valid) {
      this.userService.addUser(this.form.value);
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
