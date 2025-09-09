import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { EditBookForm } from './edit-book-form';
import { BookStore, Book } from '../../stores/book-store';
import { UsersStore } from '../../../users/stores/users.store';

describe('EditBookForm', () => {
  let component: EditBookForm;
  let fixture: ComponentFixture<EditBookForm>;
  let bookStoreMock: Partial<BookStore>;
  let usersStoreMock: Partial<UsersStore>;
  let editBookSpy: jasmine.Spy;

  const mockBook: Book = {
    id: 1,
    title: 'Test Book',
    author: 'John Doe',
    author_id: 123,
    publishedDate: new Date('2020-01-01'),
  };

  beforeEach(async () => {
    editBookSpy = jasmine.createSpy('editBook');

    bookStoreMock = {
      contextBook$: of(mockBook),
      editBook: editBookSpy,
    };

    usersStoreMock = {};

    await TestBed.configureTestingModule({
      declarations: [EditBookForm],
      providers: [
        FormBuilder,
        { provide: BookStore, useValue: bookStoreMock },
        { provide: UsersStore, useValue: usersStoreMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with controls', () => {
    expect(component.form.contains('title')).toBeTrue();
    expect(component.form.contains('author_info')).toBeTrue();
    expect(component.form.contains('publishedDate')).toBeTrue();
  });

  it('should patch form values when contextBook$ emits', () => {
    expect(component.form.value.title).toBe(mockBook.title);
    expect(component.form.value.publishedDate).toEqual(new Date(mockBook.publishedDate));
  });

  it('should not submit if the form is invalid', () => {
    component.form.controls['title'].setValue(''); // invalid because required
    component.submit();
    expect(editBookSpy).not.toHaveBeenCalled();
  });

  it('should submit valid form and call bookStore.editBook', () => {
    component.form.controls['title'].setValue('Updated Book');
    component.form.controls['author_info'].setValue({ name: 'Jane', id: 456 });
    component.form.controls['publishedDate'].setValue(new Date('2025-01-01'));
    component.form.controls['tags'].setValue(['Science Fiction']);

    spyOn(component.onClose, 'emit');

    component.submit();

    expect(editBookSpy).toHaveBeenCalledWith({
      ...mockBook,
      title: 'Updated Book',
      author: 'Jane',
      author_id: 456,
      publishedDate: new Date('2025-01-01'),
      tags : ['Science Fiction']
    });
    expect(component.form.value.title).toBeNull(); // form reset
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('should mark form as touched on submit', () => {
    spyOn(component.form, 'markAsTouched');
    component.submit();
    expect(component.form.markAsTouched).toHaveBeenCalled();
  });
});
