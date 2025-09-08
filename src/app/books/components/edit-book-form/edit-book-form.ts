import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book, BookStore } from '../../stores/book-store';
import { UsersStore } from '../../../users/stores/users.store';

@Component({
  selector: 'app-edit-book-form',
  standalone: false,
  templateUrl: './edit-book-form.html',
  styleUrl: './edit-book-form.scss',
})
export class EditBookForm implements OnInit {
  constructor(
    private fb: FormBuilder,
    private bookStore: BookStore,
    public userStore: UsersStore
  ) {}

  @Output() onClose = new EventEmitter<void>();

  form!: FormGroup;
  currentBook!: Book;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author_info: ['', [Validators.required]],
      publishedDate: ['', [Validators.required]],
    });

    this.bookStore.contextBook$.subscribe((book) => {
      if (!book) return;

      this.currentBook = book;
      this.form.patchValue({
        title: book.title,
        publishedDate: new Date(book.publishedDate),
      });
    });
  }

  submit() {
    this.form.markAsTouched();
    if (!this.form.valid) return;

    const updatedBook: Partial<Book> = {
      ...this.currentBook,
      author: this.form.value.author_info.name,
      author_id: this.form.value.author_info.id,
      title: this.form.value.title,
      publishedDate: this.form.value.publishedDate,
    };

    this.bookStore.editBook(updatedBook as Book);
    this.form.reset();
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
