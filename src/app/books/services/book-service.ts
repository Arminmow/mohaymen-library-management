import { Injectable } from '@angular/core';
import { Book, BookStore } from '../stores/book-store';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private bookStore: BookStore) {}

  addBook(book: Book) {
    this.bookStore.addBook(book);
  }

  deleteBook(book: Book) {
    this.bookStore.deleteBook(book);
  }
}
