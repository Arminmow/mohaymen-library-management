import { TestBed } from '@angular/core/testing';

import { BookService } from './book-service';
import { Book, BookStore } from '../stores/book-store';
import { NzModalService } from 'ng-zorro-antd/modal';

describe('BookService', () => {
  let service: BookService;
  let bookStoreSpy: jasmine.SpyObj<BookStore>;
  let modalSpy: jasmine.SpyObj<NzModalService>;

  beforeEach(() => {
    bookStoreSpy = jasmine.createSpyObj('bookStore', ['addBook', 'deleteBook']);
    modalSpy = jasmine.createSpyObj('NzModalService', ['confirm']);
    TestBed.configureTestingModule({
      providers: [
        { provide: BookStore, useValue: bookStoreSpy },
        { provide: NzModalService, useValue: modalSpy },
      ],
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD call store.addBook WHEN addBook is called', () => {
    // Arrange
    const book: Book = {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      publishedDate: new Date('1949-06-08'),
      author_id: 1,
    };

    // Act
    service.addBook(book);

    // Assert
    expect(bookStoreSpy.addBook).toHaveBeenCalledWith(book);
  });

  it('SHOULD call store.deleteBook WHEN deleteBook is called', () => {
    // Arrange
    const book: Book = {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      publishedDate: new Date('1949-06-08'),
      author_id: 1,
    };

    // Act
    service.deleteBook(book);

    // Assert
    expect(bookStoreSpy.deleteBook).toHaveBeenCalledWith(book);
  });
});
