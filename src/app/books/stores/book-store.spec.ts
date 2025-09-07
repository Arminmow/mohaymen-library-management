import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { BookStore, Book } from './book-store';

describe('BookStore', () => {
  let service: BookStore;

  const mockBook: Book = {
    id: 1,
    title: '1984',
    author: 'George Orwell',
    publishedDate: new Date('1949-06-08'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookStore],
    });
    service = TestBed.inject(BookStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty books list', async () => {
    const books = await firstValueFrom(service.books$);
    expect(books).toEqual([]);
  });

  it('should add a book', async () => {
    service.addBook(mockBook);

    const books = await firstValueFrom(service.books$);
    expect(books).toEqual([mockBook]);
  });

  it('should delete a book', async () => {
    service.addBook(mockBook);
    service.deleteBook(mockBook);

    const books = await firstValueFrom(service.books$);
    expect(books).toEqual([]);
  });

  it('should handle multiple books correctly', async () => {
    const secondBook: Book = {
      id: 2,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      publishedDate: new Date('1932-01-01'),
    };

    service.addBook(mockBook);
    service.addBook(secondBook);

    let books = await firstValueFrom(service.books$);
    expect(books.length).toBe(2);

    service.deleteBook(mockBook);
    books = await firstValueFrom(service.books$);
    expect(books).toEqual([secondBook]);
  });
});
