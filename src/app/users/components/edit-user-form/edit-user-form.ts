import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { User } from '../../stores/users.store';
import { BaseFormComponent } from '../../../shared/base-components/base-form-component/base-form-component';
import {
  USER_DATA_SERVICE,
  UserDataServiceAbstraction,
} from '../../services/abstractions/user-data-service-abstraction';
import {
  USER_STORE,
  UserStoreAbstraction,
} from '../../stores/user-store-abstraction';

@Component({
  selector: 'app-edit-user-form',
  standalone: false,
  templateUrl: './edit-user-form.html',
  styleUrl: './edit-user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserForm extends BaseFormComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();

  readonly user$!: Observable<User | null>;
  currentUser!: User;

  constructor(
    private fb: FormBuilder,
    @Inject(USER_DATA_SERVICE)
    private userDataService: UserDataServiceAbstraction,
    @Inject(USER_STORE) public userStore: UserStoreAbstraction
  ) {
    super();
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

    this.userDataService.editUser({ ...this.currentUser, ...this.form.value });
    this.onClose.emit();
  }
}
