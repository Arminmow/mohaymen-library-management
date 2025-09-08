import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data-service/user-data-service';
import { BaseFormComponent } from '../../../shared/base-components/base-form-component/base-form-component';

export type UserRole = 'admin' | 'user' | 'writer';

@Component({
  selector: 'app-add-user-form',
  standalone: false,
  templateUrl: './add-user-form.html',
  styleUrl: './add-user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserForm extends BaseFormComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();

  roles: UserRole[] = ['admin', 'user', 'writer'];

  constructor(private fb: FormBuilder, private userService: UserDataService) {
    super();
  }

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
}
