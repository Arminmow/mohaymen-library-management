import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing-module';
import { BooksLayout } from './containers/books-layout/books-layout';
import { BookTable } from './components/book-table/book-table';
import { BookStore } from './stores/book-store';
import { SharedModule } from '../shared/shared-module';
import { AddBookForm } from './components/add-book-form/add-book-form';

@NgModule({
  declarations: [BooksLayout, BookTable, AddBookForm],
  imports: [CommonModule, BookRoutingModule, SharedModule],
  providers: [BookStore],
})
export class BookModule {}
