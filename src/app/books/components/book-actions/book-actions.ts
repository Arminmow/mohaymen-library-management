import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { Book, BookStore } from '../../stores/book-store';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { BOOK_UI_SERVICE, BookUiServiceAbstraction } from '../../services/abstractions/book-ui-service-abstraction';

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

  constructor(@Inject(BOOK_UI_SERVICE) private bookUiService: BookUiServiceAbstraction, public bookStore: BookStore) {}

  showDeleteConfirm(book: Book) {
    this.bookUiService.confirmDelete(book);
  }
}
