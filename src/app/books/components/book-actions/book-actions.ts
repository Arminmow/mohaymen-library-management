import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Book, BookStore } from '../../stores/book-store';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { BookUiService } from '../../services/book-ui-service/book-ui-service';

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

  constructor(private bookUiService: BookUiService, public bookStore: BookStore) {}

  showDeleteConfirm(book: Book) {
    this.bookUiService.confirmDelete(book);
  }
}
