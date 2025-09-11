import { InjectionToken } from '@angular/core';
import { Book } from '../../stores/book-store';

export interface BookServiceAbstraction {
  addBook(book: Book): void;
  deleteBook(book: Book): void;
  editBook(book: Book): void;
  addBookFromFormData(formData: {
    title: string;
    author_info: { id: number; name: string };
    publishedDate: Date;
    tags: string[];
  }): void;
  editBookFromFormData(formData: {
    id: number;
    title: string;
    author_info: { id: number; name: string };
    publishedDate: Date;
    tags: string[];
  }): void;
}

export const BOOK_SERVICE = new InjectionToken<BookServiceAbstraction>(
  'BOOK_SERVICE'
);
