import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../../shared/base-components/base-form-component/base-form-component';
import { BOOK_TAGS } from '../../stores/book-tags';
import {
  BOOK_SERVICE,
  BookServiceAbstraction,
} from '../../services/abstractions/book-service-abstraction';
import { USER_STORE, UserStoreAbstraction } from '../../../users/stores/user-store-abstraction';

@Component({
  selector: 'app-add-book-form',
  standalone: false,
  templateUrl: './add-book-form.html',
  styleUrl: './add-book-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookForm extends BaseFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(BOOK_SERVICE) private bookService: BookServiceAbstraction,
    @Inject(USER_STORE) public userStore: UserStoreAbstraction
  ) {
    super();
  }
  @Output() onClose = new EventEmitter<void>();
  bookTags = BOOK_TAGS;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      author_info: [null, [Validators.required]],
      publishedDate: [null, [Validators.required]],
      tags: [[]],
    });
  }

  submit() {
    this.form.markAllAsTouched();
    console.log(this.form.value);

    if (this.form.valid) {
      try {
        this.bookService.addBookFromFormData(this.form.value);
        this.form.reset();
        this.onClose.emit();
      } catch (error) {
        console.error('Failed to add book:', error);
      }
    }
  }
}
