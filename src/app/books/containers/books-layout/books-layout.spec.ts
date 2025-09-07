import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksLayout } from './books-layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-book-table',
  template: '',
  standalone: false,
})
class BookTableStub {}

describe('BooksLayout', () => {
  let component: BooksLayout;
  let fixture: ComponentFixture<BooksLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksLayout, BookTableStub],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
