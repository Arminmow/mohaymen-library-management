import { Inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Book, BookStore } from '../../stores/book-store';
import { BookUiServiceAbstraction } from '../abstractions/book-ui-service-abstraction';
import { BOOK_STORE, BookStoreAbstraction } from '../../stores/book-store-abstraction';

@Injectable()
export class BookUiService implements BookUiServiceAbstraction {
  //  todo :This should be book service not book store , its late will do tomorrow
  constructor(@Inject(BOOK_STORE) public bookStore: BookStoreAbstraction, private modal: NzModalService) {}

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
