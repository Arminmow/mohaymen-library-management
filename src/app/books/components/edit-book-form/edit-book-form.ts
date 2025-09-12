import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book, BookStore } from '../../stores/book-store';
import { BaseFormComponent } from '../../../shared/base-components/base-form-component/base-form-component';
import { BOOK_TAGS } from '../../stores/book-tags';
import {
  BOOK_SERVICE,
  BookServiceAbstraction,
} from '../../services/abstractions/book-service-abstraction';
import { USER_STORE, UserStoreAbstraction } from '../../../users/stores/user-store-abstraction';
import { BOOK_STORE, BookStoreAbstraction } from '../../stores/book-store-abstraction';

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
    @Inject(BOOK_SERVICE) private bookService: BookServiceAbstraction,
    @Inject(USER_STORE) public userStore: UserStoreAbstraction,
    @Inject(BOOK_STORE) private bookStore: BookStoreAbstraction
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
