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

  addBookFromFormData(formData: { title: string, author_info: { id: number, name: string }, publishedDate: Date }): void {
  const newBook: Book = {
    title: formData.title,
    author: formData.author_info.name,
    author_id: formData.author_info.id,
    publishedDate: formData.publishedDate,
  } as Book;
  this.addBook(newBook);
}
}
