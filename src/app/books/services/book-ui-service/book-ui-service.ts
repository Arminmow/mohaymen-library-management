import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Book, BookStore } from '../../stores/book-store';
import { BookUiServiceAbstraction } from '../abstractions/book-ui-service-abstraction';

@Injectable()
export class BookUiService implements BookUiServiceAbstraction {
  constructor(private bookStore: BookStore, private modal: NzModalService) {}

  confirmDelete(book: Book) {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete ${book.title}?`,
      nzOkText: 'Yes',
      nzOkDanger: true,
      nzOnOk: () => this.bookStore.deleteBook(book),
      nzCancelText: 'No',
    });
  }
}
