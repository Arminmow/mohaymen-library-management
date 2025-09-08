import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { User, UsersStore } from '../../stores/users.store';
import { UserDataService } from '../../services/user-data-service/user-data-service';

@Component({
  selector: 'app-edit-user-form',
  standalone: false,
  templateUrl: './edit-user-form.html',
  styleUrl: './edit-user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserForm implements OnInit {
  @Output() onClose = new EventEmitter<void>();

  readonly user$!: Observable<User | null>;
  currentUser!: User;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserDataService,
    private userStore: UsersStore
  ) {
    this.user$ = this.userStore.contextUser$;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18)]],
    });

    // patch form whenever contextUser changes
    this.userStore.contextUser$.subscribe((user) => {
      if (!user) return;

      this.currentUser = user;
      this.form.patchValue({
        name: user.name,
        age: user.age,
      });
    });
  }

  submit() {
    this.form.markAsTouched();
    if (!this.form.valid) return;

    this.userService.editUser({ ...this.currentUser, ...this.form.value });
    this.onClose.emit();
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
