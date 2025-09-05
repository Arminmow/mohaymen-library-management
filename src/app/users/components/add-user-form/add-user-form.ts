import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: [null, [Validators.required, Validators.min(0)]],
      role: ['user', Validators.required],
    });
  }

  submit() {
    console.log(this.form.value);
    
    if (this.form.valid) {
      console.log('ok bro');
    }
  }
}
