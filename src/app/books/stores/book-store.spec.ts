import { TestBed } from '@angular/core/testing';
import { BookStore, Book } from './book-store';
import { PersistenceService } from '../../shared/services/persistence-service/persistence-service';
import { firstValueFrom } from 'rxjs';
import { Subscription } from 'rxjs';

describe('BookStore', () => {
  let service: BookStore;
  let persistenceServiceSpy: jasmine.SpyObj<PersistenceService>;
  const STORAGE_KEY = 'books-state';

  const mockBook: Book = {
    id: 1,
    title: '1984',
    author: 'George Orwell',
    publishedDate: new Date('1949-06-08'),
    author_id: 1
  };

  beforeEach(() => {
    persistenceServiceSpy = jasmine.createSpyObj('PersistenceService', [
      'get',
      'save',
    ]);
    TestBed.configureTestingModule({
      providers: [
        BookStore,
        { provide: PersistenceService, useValue: persistenceServiceSpy },
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(BookStore);
    expect(service).toBeTruthy();
  });

  it('should initialize with persisted state if available', async () => {
    persistenceServiceSpy.get.and.returnValue({ books: [mockBook] });
    service = TestBed.inject(BookStore);

    const books = await firstValueFrom(service.books$);
    expect(books).toEqual([mockBook]);
    expect(persistenceServiceSpy.get).toHaveBeenCalledWith(STORAGE_KEY);
  });

  it('should initialize with default book if no persisted state', async () => {
    persistenceServiceSpy.get.and.returnValue(null);
    service = TestBed.inject(BookStore);

    const books = await firstValueFrom(service.books$);
    expect(books.length).toBe(1);
    expect(books[0].title.toLowerCase()).toContain('harry potter');
  });

  it('should add a book and persist it', async () => {
    persistenceServiceSpy.get.and.returnValue({ books: [] });
    service = TestBed.inject(BookStore);

    const newBook: Omit<Book, 'id'> = {
      title: 'New Book',
      author: 'Author X',
      publishedDate: new Date('2020-01-01'),
      author_id: 1,
    };

    service.addBook(newBook);

    const books = await firstValueFrom(service.books$);
    expect(books.length).toBe(1);
    expect(books[0].title).toBe('New Book');
    expect(persistenceServiceSpy.save).toHaveBeenCalledWith(
      STORAGE_KEY,
      jasmine.objectContaining({ books })
    );
  });

  it('should delete a book by id', async () => {
    persistenceServiceSpy.get.and.returnValue({ books: [] });
    service = TestBed.inject(BookStore);

    service.addBook({
      title: 'To Delete',
      author: 'Author Y',
      publishedDate: new Date(),
      author_id: 1,
    });

    const addedBooks = await firstValueFrom(service.books$);
    const addedBook = addedBooks[0];

    service.deleteBook(addedBook);

    const booksAfterDelete = await firstValueFrom(service.books$);
    expect(booksAfterDelete.find((b) => b.id === addedBook.id)).toBeUndefined();
  });

  it('should edit a book when ids match', async () => {
    persistenceServiceSpy.get.and.returnValue({ books: [] });
    service = TestBed.inject(BookStore);

    service.addBook({
      title: 'Original',
      author: 'Author Z',
      publishedDate: new Date(),
      author_id: 1,
    });

    const updatedBook: Book = {
      id: 1,
      title: 'Updated',
      author: 'Author Z',
      publishedDate: new Date('2022-01-01'),
      author_id: 1,
    };

    service.editBook(updatedBook);

    const books = await firstValueFrom(service.books$);
    expect(books[0]).toEqual(updatedBook);
  });

  it('should do nothing if editBook is called with non-existent id', async () => {
    persistenceServiceSpy.get.and.returnValue({ books: [] });
    service = TestBed.inject(BookStore);

    service.addBook({
      title: 'Existing',
      author: 'Author A',
      publishedDate: new Date(),
      author_id: 1,
    });

    const before = await firstValueFrom(service.books$);

    service.editBook({
      id: 999,
      title: 'Non-existent',
      author: 'None',
      publishedDate: new Date(),
      author_id: 1,
    });

    const after = await firstValueFrom(service.books$);
    expect(after).toEqual(before);
  });
});
