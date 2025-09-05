import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserForm } from './add-user-form';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddUserForm', () => {
  let component: AddUserForm;
  let fixture: ComponentFixture<AddUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserForm],
       schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
