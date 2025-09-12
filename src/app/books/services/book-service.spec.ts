import { TestBed } from '@angular/core/testing';
import { BookService } from './book-service';
import { BookStoreAbstraction, BOOK_STORE } from '../stores/book-store-abstraction';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Book } from '../stores/book-store';

describe('BookService', () => {
  let service: BookService;
  let bookStoreSpy: jasmine.SpyObj<BookStoreAbstraction>;
  let modalSpy: jasmine.SpyObj<NzModalService>;

  beforeEach(() => {
    bookStoreSpy = jasmine.createSpyObj('BookStore', ['addBook', 'deleteBook', 'editBook']);
    modalSpy = jasmine.createSpyObj('NzModalService', ['confirm']);

    TestBed.configureTestingModule({
      providers: [
        BookService,
        { provide: BOOK_STORE, useValue: bookStoreSpy }, // ✅ token provider
        { provide: NzModalService, useValue: modalSpy },
      ],
    });

    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD call store.addBook WHEN addBook is called', () => {
    const book: Book = {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      publishedDate: new Date('1949-06-08'),
      author_id: 1,
    };

    service.addBook(book);

    expect(bookStoreSpy.addBook).toHaveBeenCalledWith(book);
  });

  it('SHOULD call store.deleteBook WHEN deleteBook is called', () => {
    const book: Book = {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      publishedDate: new Date('1949-06-08'),
      author_id: 1,
    };

    service.deleteBook(book);

    expect(bookStoreSpy.deleteBook).toHaveBeenCalledWith(book);
  });

  it('SHOULD call store.editBook WHEN editBook is called', () => {
    const book: Book = {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      publishedDate: new Date('1949-06-08'),
      author_id: 1,
    };

    service.editBook(book);

    expect(bookStoreSpy.editBook).toHaveBeenCalledWith(book);
  });
});
