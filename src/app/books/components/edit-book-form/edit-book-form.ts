import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book, BookStore } from '../../stores/book-store';
import { UsersStore } from '../../../users/stores/users.store';
import { BaseFormComponent } from '../../../shared/base-components/base-form-component/base-form-component';
import { BookService } from '../../services/book-service';
import { BOOK_TAGS } from '../../stores/book-tags';

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
    private bookService: BookService,
    public userStore: UsersStore,
    private bookStore: BookStore
  ) {
    super();
  }

  @Output() onClose = new EventEmitter<void>();

  bookTags = BOOK_TAGS;
  currentBook!: Book;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      author_info: ['', [Validators.required]],
      publishedDate: ['', [Validators.required]],
      tags: [[]],
    });

    this.bookStore.contextBook$.subscribe((book) => {
      if (!book) return;

      this.currentBook = book;
      this.form.patchValue({
        title: book.title,
        publishedDate: new Date(book.publishedDate),
        tags: book.tags,
      });
    });
  }

  submit() {
    console.log(this.form.value);

    this.form.markAsTouched();
    if (!this.form.valid) return;

    this.bookService.editBookFromFormData({
      ...this.currentBook,
      ...this.form.value,
    });
    this.form.reset();
    this.onClose.emit();
  }
}
