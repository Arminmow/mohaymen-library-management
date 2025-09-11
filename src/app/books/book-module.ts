import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing-module';
import { BooksLayout } from './containers/books-layout/books-layout';
import { BookTable } from './components/book-table/book-table';
import { SharedModule } from '../shared/shared-module';
import { AddBookForm } from './components/add-book-form/add-book-form';
import { BookService } from './services/book-service';
import { BookActions } from './components/book-actions/book-actions';
import { EditBookForm } from './components/edit-book-form/edit-book-form';
import { BOOK_SERVICE } from './services/abstractions/book-service-abstraction';

@NgModule({
  declarations: [
    BooksLayout,
    BookTable,
    AddBookForm,
    BookActions,
    EditBookForm,
  ],
  imports: [CommonModule, BookRoutingModule, SharedModule],
  providers: [{ provide: BOOK_SERVICE, useClass: BookService }],
})
export class BookModule {}
