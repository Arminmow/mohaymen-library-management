import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Book } from '../../stores/book-store';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { BOOK_STORE, BookStoreAbstraction } from '../../stores/book-store-abstraction';

@Component({
  selector: 'app-book-table',
  standalone: false,
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookTableComponent {
  // yes i know i could create a generic table component 
  // instead of 2 nearly identical table components
  // but i think thats overkill for this scale
  // but i did something similar with generic modal
  // just to get the hang of it
  constructor(@Inject(BOOK_STORE) public bookStore: BookStoreAbstraction,  private nzContextMenuService: NzContextMenuService,) {}

  contextMenu(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
    user: Book
  ): void {
    this.bookStore.setContextBook(user);
    this.nzContextMenuService.create($event, menu);
  }
}
