import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
export class EditUserForm implements OnInit, OnChanges {
  @Input() user!: User;
  @Output() onClose = new EventEmitter<void>();

  readonly user$!: Observable<User | null>;

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
      name: [this.user?.name, [Validators.required, Validators.minLength(3)]],
      age: [this.user?.age, [Validators.required, Validators.min(18)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.form) {
      this.form.patchValue({
        name: this.user?.name,
        age: this.user?.age,
      });
    }
  }

  submit() {
    this.form.markAsTouched();
    if (this.form.valid) {
      this.userService.editUser({ ...this.user, ...this.form.value });
      this.onClose.emit();
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
