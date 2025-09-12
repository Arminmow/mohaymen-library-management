import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserForm } from './add-user-form';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserDataService } from '../../services/user-data-service/user-data-service';
import { USER_DATA_SERVICE } from '../../services/abstractions/user-data-service-abstraction';

describe('AddUserForm', () => {
  let component: AddUserForm;
  let fixture: ComponentFixture<AddUserForm>;
  let userServiceSpy: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['addUser']);

    await TestBed.configureTestingModule({
      declarations: [AddUserForm],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: USER_DATA_SERVICE, useValue: userServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD mark name as invalid when empty', () => {
    component.form.controls['name'].setValue('');
    expect(component.form.controls['name'].valid).toBeFalse();
    expect(component.form.controls['name'].errors).toEqual({ required: true });
  });

  it('SHOULD mark name as invalid when too short', () => {
    component.form.controls['name'].setValue('A');
    const errors = component.form.controls['name'].errors || {};

    expect(component.form.controls['name'].valid).toBeFalse();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['minlength'].requiredLength).toBe(3);
  });

  it('SHOULD mark age as invalid when negative', () => {
    component.form.controls['age'].setValue(10);
    expect(component.form.controls['age'].valid).toBeFalse();
    expect(component.form.controls['age'].errors).toEqual({
      min: { min: 18, actual: 10 },
    });
  });

  it('SHOULD mark role as invalid when null', () => {
    component.form.controls['role'].setValue(null);
    expect(component.form.controls['role'].valid).toBeFalse();
    expect(component.form.controls['role'].errors).toEqual({ required: true });
  });

  it('SHOULD call addUser on userService when form is valid and submitted', () => {
    component.form.controls['name'].setValue('John Doe');
    component.form.controls['age'].setValue(30);
    component.form.controls['role'].setValue('user');

    const expected = { ...component.form.value }; // capture a snapshot - cuz we reset the form in the component and we get null values

    component.submit();

    expect(userServiceSpy.addUser).toHaveBeenCalledWith(expected);
  });
});
