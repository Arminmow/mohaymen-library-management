import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book-service';
import { UsersStore } from '../../../users/stores/users.store';
import { Book } from '../../stores/book-store';

@Component({
  selector: 'app-add-book-form',
  standalone: false,
  templateUrl: './add-book-form.html',
  styleUrl: './add-book-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookForm implements OnInit {
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public userStore: UsersStore
  ) {}
  @Output() onClose = new EventEmitter<void>();

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      author_info: [null, [Validators.required]],
      publishedDate: [null, [Validators.required]],
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      try {
        this.bookService.addBookFromFormData(this.form.value);
        this.onClose.emit();
      } catch (error) {
        console.error('Failed to add book:', error);
      }
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
