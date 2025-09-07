import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksLayout } from './books-layout';
import { Component, Directive, Input } from '@angular/core';

@Component({
  selector: 'app-book-table',
  template: '',
  standalone: false,
})
class BookTableStub {}

@Component({
  selector: 'app-generic-modal',
  template: '',
  standalone: false,
})
class GenericModalStub {}

@Component({
  selector: 'app-add-book-form',
  template: '',
  standalone: false,
})
class AddBookFormStub {}

@Directive({
  selector: '[nz-button]',
  standalone: false,
})
class NzButtonStubDirective {
  @Input() nzType: string | undefined;
}

describe('BooksLayout', () => {
  let component: BooksLayout;
  let fixture: ComponentFixture<BooksLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BooksLayout,
        BookTableStub,
        GenericModalStub,
        AddBookFormStub,
        NzButtonStubDirective
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
