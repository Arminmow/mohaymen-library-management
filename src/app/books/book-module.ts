import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing-module';
import { BooksLayout } from './containers/books-layout/books-layout';
import { BookTable } from './components/book-table/book-table';
import { BookStore } from './stores/book-store';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [BooksLayout, BookTable],
  imports: [CommonModule, BookRoutingModule, SharedModule],
  providers: [BookStore],
})
export class BookModule {}
