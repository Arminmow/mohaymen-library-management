import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing-module';
import { BooksLayout } from './containers/books-layout/books-layout';


@NgModule({
  declarations: [
    BooksLayout
  ],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
