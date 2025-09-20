import { BOOK_SERVICE } from '../../services/abstractions/book-service-abstraction';
import { USER_STORE, UserStoreAbstraction } from '../../../users/stores/user-store-abstraction';
import { BOOK_STORE, BookStoreAbstraction } from '../../stores/book-store-abstraction';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Book } from '../../stores/book-store';
import { EditBookFormComponent } from './edit-book-form.component';

describe('EditBookForm', () => {
  let component: EditBookFormComponent;
  let fixture: ComponentFixture<EditBookFormComponent>;

  // Shared mock book
  const mockBook: Book = {
    id: 1,
    title: 'Test Book',
    author: 'John Doe',
    author_id: 123,
    publishedDate: new Date('2020-01-01'),
  };

  // Mocks for stores/services (will be re-created inside beforeEach where needed)
  let bookServiceMock: { editBookFromFormData: jasmine.Spy };
  const bookStoreMock: Partial<BookStoreAbstraction> = {
    contextBook$: of(mockBook),
  };
  const userStoreMock: Partial<UserStoreAbstraction> = {};

  beforeEach(async () => {
    // create a fresh spy for every test (so call counts don't leak between tests)
    bookServiceMock = { editBookFromFormData: jasmine.createSpy('editBookFromFormData') };

    await TestBed.configureTestingModule({
      declarations: [EditBookFormComponent],
      providers: [
        { provide: BOOK_SERVICE, useValue: bookServiceMock },
        { provide: BOOK_STORE, useValue: bookStoreMock },
        { provide: USER_STORE, useValue: userStoreMock },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit runs here and contextBook$ patches the form
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with controls', () => {
    expect(component.form.contains('title')).toBeTrue();
    expect(component.form.contains('author_info')).toBeTrue();
    expect(component.form.contains('publishedDate')).toBeTrue();
    expect(component.form.contains('tags')).toBeTrue();
  });

  it('should patch form values when contextBook$ emits', () => {
    expect(component.form.value.title).toBe(mockBook.title);
    // compare time because date objects may be different instances
    const patchedDate = component.form.value.publishedDate as Date;
    expect(patchedDate.getTime()).toBe(new Date(mockBook.publishedDate).getTime());
  });

  it('should not submit if the form is invalid', () => {
    // Arrange - make form invalid
    component.form.controls['title'].setValue(''); // required -> invalid

    // Act
    component.submit();

    // Assert - spy was not called in this test (fresh spy)
    expect(bookServiceMock.editBookFromFormData).not.toHaveBeenCalled();
  });

  it('should submit valid form and call bookService.editBookFromFormData with currentBook + form.value (author_info kept)', () => {
    // Arrange - set form values (note: component currently DOES NOT map author_info -> author)
    component.form.controls['title'].setValue('Updated Book');
    component.form.controls['author_info'].setValue({ name: 'Jane', id: 456 });
    component.form.controls['publishedDate'].setValue(new Date('2025-01-01'));
    component.form.controls['tags'].setValue(['Science Fiction']);

    spyOn(component.onClose, 'emit');

    // Act
    component.submit();

    // Assert - spy should have been called once
    expect((bookServiceMock.editBookFromFormData as jasmine.Spy).calls.count()).toBe(1);

    // Grab the actual argument and assert its real shape returned by your component
    const actualArg = (bookServiceMock.editBookFromFormData as jasmine.Spy).calls.mostRecent().args[0];

    expect(actualArg.id).toBe(mockBook.id);
    expect(actualArg.title).toBe('Updated Book');

    // Important: because component spreads currentBook first, author and author_id remain from mockBook
    expect(actualArg.author).toBe(mockBook.author);
    expect(actualArg.author_id).toBe(mockBook.author_id);

    // The form's author_info is still present in the object (this is exactly what your component produces)
    expect(actualArg.author_info).toEqual({ name: 'Jane', id: 456 });

    // tags should match
    expect(actualArg.tags).toEqual(['Science Fiction']);

    // publishedDate should be a Date matching the value we set
    expect(actualArg.publishedDate instanceof Date).toBeTrue();
    expect((actualArg.publishedDate as Date).getTime()).toBe(new Date('2025-01-01').getTime());

    // form was reset
    expect(component.form.value.title).toBeNull();
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('should mark form as touched on submit', () => {
    spyOn(component.form, 'markAsTouched');
    component.submit();
    expect(component.form.markAsTouched).toHaveBeenCalled();
  });
});
