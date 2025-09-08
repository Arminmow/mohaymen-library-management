import { Component, Input, ViewChild } from '@angular/core';
import { Book } from '../../stores/book-store';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-actions',
  standalone: false,
  templateUrl: './book-actions.html',
  styleUrl: './book-actions.scss',
})
export class BookActions {
  @Input() contextBook!: Book | null;

  @ViewChild('menu', { static: true, read: NzDropdownMenuComponent })
  public menu!: NzDropdownMenuComponent;


  constructor(private bookService: BookService) {}

  showDeleteConfirm() {
    if (this.contextBook) {
      this.bookService.confirmDelete(this.contextBook);
    }
  }

}
