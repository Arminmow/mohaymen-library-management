import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { Book } from '../../stores/book-store';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { BOOK_UI_SERVICE, BookUiServiceAbstraction } from '../../services/abstractions/book-ui-service-abstraction';
import { BOOK_STORE, BookStoreAbstraction } from '../../stores/book-store-abstraction';

@Component({
  selector: 'app-book-actions',
  standalone: false,
  templateUrl: './book-actions.html',
  styleUrl: './book-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookActions {
  @ViewChild('menu', { static: true, read: NzDropdownMenuComponent })
  public menu!: NzDropdownMenuComponent;

  constructor(@Inject(BOOK_UI_SERVICE) private bookUiService: BookUiServiceAbstraction, @Inject(BOOK_STORE) public bookStore: BookStoreAbstraction) {}

  showDeleteConfirm(book: Book) {
    this.bookUiService.confirmDelete(book);
  }
}
