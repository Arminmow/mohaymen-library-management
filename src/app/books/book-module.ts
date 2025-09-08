import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing-module';
import { BooksLayout } from './containers/books-layout/books-layout';
import { BookTable } from './components/book-table/book-table';
import { SharedModule } from '../shared/shared-module';
import { AddBookForm } from './components/add-book-form/add-book-form';
import { BookService } from './services/book-service';
import { BookActions } from './components/book-actions/book-actions';

@NgModule({
  declarations: [BooksLayout, BookTable, AddBookForm, BookActions],
  imports: [CommonModule, BookRoutingModule, SharedModule],
  providers: [BookService],
})
export class BookModule {}
