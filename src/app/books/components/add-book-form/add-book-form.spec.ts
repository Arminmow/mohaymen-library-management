import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookForm } from './add-book-form';

describe('AddBookForm', () => {
  let component: AddBookForm;
  let fixture: ComponentFixture<AddBookForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBookForm],
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
});
