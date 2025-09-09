import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookActions } from './book-actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Book, BookStore } from '../../stores/book-store';

@Component({
  selector: 'nz-dropdown-menu',
  template: '',
  standalone: false,
  exportAs: 'nzDropdownMenu',
})
class NzDropDownMenuStub {}

@Component({
  selector: 'app-generic-modal',
  template: '',
  standalone: false,
})
class GenericModalStub {}

@Component({
  selector: 'app-edit-book-form',
  template: '',
  standalone: false,
})
class EditBookFormStub {}

describe('BookActions', () => {
  let component: BookActions;
  let fixture: ComponentFixture<BookActions>;
  let modalServiceSpy: jasmine.SpyObj<NzModalService>;

  const mockData: Book = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    publishedDate: new Date('2023-01-01'),
    author_id: 1,
  };

  const mockStore = {
    books$: of([mockData]),
    deleteBook: jasmine.createSpy('deleteBook'),
    addBook: jasmine.createSpy('addBook'),
    editBook: jasmine.createSpy('editBook'),
  };

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('NzModalService', ['confirm']);
    await TestBed.configureTestingModule({
      declarations: [
        BookActions,
        NzDropDownMenuStub,
        GenericModalStub,
        EditBookFormStub,
      ],
      providers: [
        { provide: NzModalService, useValue: modalServiceSpy },
        { provide: BookStore, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
