import { Inject, Injectable } from '@angular/core';
import { Book } from '../stores/book-store';
import { BookServiceAbstraction } from './abstractions/book-service-abstraction';
import {
  BOOK_STORE,
  BookStoreAbstraction,
} from '../stores/book-store-abstraction';

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

  addBookFromFormData(formData: {
    title: string;
    author_info: { id: number; name: string };
    publishedDate: Date;
    tags: string[];
  }) {
    const newBook: Omit<Book, 'id'> = {
      title: formData.title,
      author: formData.author_info.name,
      author_id: formData.author_info.id,
      publishedDate: formData.publishedDate,
      tags: formData.tags,
    };
    this.bookStore.addBook(newBook);
  }

  editBookFromFormData(formData: {
    id: number;
    title: string;
    author_info: { id: number; name: string };
    publishedDate: Date;
    tags: string[];
  }) {
    const updatedBook: Book = {
      id: formData.id,
      title: formData.title,
      author: formData.author_info.name,
      author_id: formData.author_info.id,
      publishedDate: formData.publishedDate,
      tags: formData.tags,
    };
    this.bookStore.editBook(updatedBook);
  }
}
