import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book-form',
  standalone: false,
  templateUrl: './add-book-form.html',
  styleUrl: './add-book-form.scss',
})
export class AddBookForm implements OnInit {
  constructor(private fb: FormBuilder) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
    });
  }

  submit() {
    console.log(this.form.value);
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
