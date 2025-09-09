import { TestBed } from '@angular/core/testing';
import { BookUiService } from './book-ui-service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BookStore } from '../../stores/book-store';
import { Book } from '../../stores/book-store';

describe('BookUiService', () => {
  let service: BookUiService;
  let modalSpy: jasmine.SpyObj<NzModalService>;
  let bookStoreSpy: jasmine.SpyObj<BookStore>;

  beforeEach(() => {
    modalSpy = jasmine.createSpyObj('NzModalService', ['confirm']);
    bookStoreSpy = jasmine.createSpyObj('BookStore', ['deleteBook']);

    modalSpy.confirm.and.callFake((options: any) => options.nzOnOk());

    TestBed.configureTestingModule({
      providers: [
        BookUiService,
        { provide: NzModalService, useValue: modalSpy },
        { provide: BookStore, useValue: bookStoreSpy },
      ],
    });

    service = TestBed.inject(BookUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call modal.confirm and deleteBook on OK', () => {
    const book: Book = { id: 1, title: 'Test Book' } as Book;

    service.confirmDelete(book);

    expect(modalSpy.confirm).toHaveBeenCalledWith(
      jasmine.objectContaining({
        nzTitle: `Are you sure you want to delete ${book.title}?`,
        nzOkText: 'Yes',
        nzOkDanger: true,
        nzCancelText: 'No',
      })
    );

    expect(bookStoreSpy.deleteBook).toHaveBeenCalledWith(book);
  });
});
