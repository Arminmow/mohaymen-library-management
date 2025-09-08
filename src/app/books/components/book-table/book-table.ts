import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Book, BookStore } from '../../stores/book-store';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-book-table',
  standalone: false,
  templateUrl: './book-table.html',
  styleUrl: './book-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookTable {
  // yes i know i could create a generic table component 
  // instead of 2 nearly identical table components
  // but i think thats overkill for this scale
  // but i did something similar with generic modal
  // just to get the hang of it
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
