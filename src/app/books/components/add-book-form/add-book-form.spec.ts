import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookForm } from './add-book-form';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookService } from '../../services/book-service';

describe('AddBookForm', () => {
  let component: AddBookForm;
  let fixture: ComponentFixture<AddBookForm>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    bookServiceSpy = jasmine.createSpyObj('BookService', ['addBook']);
    await TestBed.configureTestingModule({
      declarations: [AddBookForm],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: BookService, useValue: bookServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD mark title as invalid WHEN title is empty', () => {
    // Arrange
    component.form.controls['title'].setValue('');

    // Act

    // Assert
    expect(component.form.controls['title'].valid).toBeFalse();
    expect(component.form.controls['title'].errors).toEqual({ required: true });
  });

  it('SHOULD call store.addBook WHEN form is valid and submitted', () => {
    // Arrange
    component.form.controls['title'].setValue('1984');
    component.form.controls['author_info'].setValue({ id: 1, name: 'mamad' });

    // Act
    component.submit();

    // Assert
    expect(component.form.controls['title'].valid).toBeTrue();
    expect(component.form.controls['author_info'].valid).toBeTrue();
    expect(bookServiceSpy.addBook).toHaveBeenCalledWith({
      title: '1984',
      author_id: 1,
      author: 'mamad'
    } as any);
  });
});
