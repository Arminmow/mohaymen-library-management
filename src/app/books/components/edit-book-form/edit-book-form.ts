import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book, BookStore } from '../../stores/book-store';
import { UsersStore } from '../../../users/stores/users.store';
import { BaseFormComponent } from '../../../shared/base-components/base-form-component/base-form-component';

@Component({
  selector: 'app-edit-book-form',
  standalone: false,
  templateUrl: './edit-book-form.html',
  styleUrl: './edit-book-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBookForm extends BaseFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private bookStore: BookStore,
    public userStore: UsersStore
  ) {
    super();
  }

  @Output() onClose = new EventEmitter<void>();

  currentBook!: Book;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
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
}
