import { Inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Book } from '../../stores/book-store';
import { BookUiServiceAbstraction } from '../abstractions/book-ui-service-abstraction';
import {
  BOOK_SERVICE,
  BookServiceAbstraction,
} from '../abstractions/book-service-abstraction';

@Injectable()
export class BookUiService implements BookUiServiceAbstraction {
  constructor(
    @Inject(BOOK_SERVICE) public bookService: BookServiceAbstraction,
    private modal: NzModalService
  ) {}

  confirmDelete(book: Book) {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete ${book.title}?`,
      nzOkText: 'Yes',
      nzOkDanger: true,
      nzOnOk: () => this.bookService.deleteBook(book),
      nzCancelText: 'No',
    });
  }
}
