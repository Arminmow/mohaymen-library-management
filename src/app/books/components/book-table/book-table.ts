import { Component } from '@angular/core';
import { BookStore } from '../../stores/book-store';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { User } from '../../../users/stores/users.store';

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
    user: User
  ): void {
    console.log(`setting context user to ${user.name}`);
    this.nzContextMenuService.create($event, menu);
  }
}
