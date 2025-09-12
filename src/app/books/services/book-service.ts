import { Inject, Injectable } from '@angular/core';
import { Book } from '../stores/book-store';
import { BookServiceAbstraction } from './abstractions/book-service-abstraction';
import {
  BOOK_STORE,
  BookStoreAbstraction,
} from '../stores/book-store-abstraction';
import { BookFormData, mapFormDataToBook } from './book-mapper';

@Injectable()
export class BookService implements BookServiceAbstraction {
  constructor(@Inject(BOOK_STORE) private bookStore: BookStoreAbstraction) {}

  addBook(book: Book) {
    this.bookStore.addBook(book);
  }

  deleteBook(book: Book) {
    this.bookStore.deleteBook(book);
  }

  editBook(book: Book) {
    this.bookStore.editBook(book);
  }

  addBookFromFormData(formData: BookFormData) {
    const newBook = mapFormDataToBook(formData) as Omit<Book, 'id'>;
    this.bookStore.addBook(newBook);
  }

  editBookFromFormData(formData: BookFormData) {
    const updatedBook = mapFormDataToBook(formData) as Book;
    this.bookStore.editBook(updatedBook);
  }
}
