import { Component } from '@angular/core';
import { Book, BookStore } from '../../stores/book-store';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-book-table',
  standalone: false,
  templateUrl: './book-table.html',
  styleUrl: './book-table.scss',
})
export class BookTable {
  constructor(public bookStore: BookStore,  private nzContextMenuService: NzContextMenuService,) {}

  contextMenu(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
    user: Book
  ): void {
    this.bookStore.setContextBook(user);
    this.nzContextMenuService.create($event, menu);
  }
}
