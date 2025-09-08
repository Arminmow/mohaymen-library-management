import { Component, ViewChild } from '@angular/core';
import { Book, BookStore } from '../../stores/book-store';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-actions',
  standalone: false,
  templateUrl: './book-actions.html',
  styleUrl: './book-actions.scss',
})
export class BookActions {
  @ViewChild('menu', { static: true, read: NzDropdownMenuComponent })
  public menu!: NzDropdownMenuComponent;

  constructor(private bookService: BookService, public bookStore: BookStore) {}

  showDeleteConfirm(book: Book) {
    this.bookService.confirmDelete(book);
  }
}
