import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddBookForm } from './add-book-form';
import { BOOK_SERVICE, BookServiceAbstraction } from '../../services/abstractions/book-service-abstraction';
import { USER_STORE, UserStoreAbstraction } from '../../../users/stores/user-store-abstraction';
import { FormBuilder } from '@angular/forms';

describe('AddBookForm', () => {
  let component: AddBookForm;
  let fixture: ComponentFixture<AddBookForm>;
  let bookServiceSpy: jasmine.SpyObj<BookServiceAbstraction>;
  let userStoreMock: Partial<UserStoreAbstraction>;

  beforeEach(async () => {
    bookServiceSpy = jasmine.createSpyObj('BookService', ['addBookFromFormData']);

    userStoreMock = {
      
    };

    await TestBed.configureTestingModule({
      declarations: [AddBookForm],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: BOOK_SERVICE, useValue: bookServiceSpy },
        { provide: USER_STORE, useValue: userStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD mark title as invalid WHEN title is empty', () => {
    component.form.controls['title'].setValue('');
    expect(component.form.controls['title'].valid).toBeFalse();
    expect(component.form.controls['title'].errors).toEqual({ required: true });
  });

  it('SHOULD call store.addBook WHEN form is valid and submitted', () => {
    component.form.controls['title'].setValue('1984');
    component.form.controls['author_info'].setValue({ id: 1, name: 'mamad' });
    component.form.controls['publishedDate'].setValue(new Date('2023-01-01'));

    const expected = { ...component.form.value };

    component.submit();

    expect(bookServiceSpy.addBookFromFormData).toHaveBeenCalledWith(expected);
  });
});
