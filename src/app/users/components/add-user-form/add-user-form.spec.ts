import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserForm } from './add-user-form';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserDataService } from '../../services/user-data-service/user-data-service';

describe('AddUserForm', () => {
  let component: AddUserForm;
  let fixture: ComponentFixture<AddUserForm>;
  let userServiceSpy: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['addUser']);

    await TestBed.configureTestingModule({
      declarations: [AddUserForm],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserDataService, useValue: userServiceSpy }
      ]
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

  it('SHOULD return empty string WHEN control does not exist', () => {
    const msg = component.getErrorMessage('nonExistent');
    expect(msg).toBe('');
  });

  it('SHOULD return empty string WHEN control has no errors', () => {
    component.form.controls['name'].setErrors(null);
    const msg = component.getErrorMessage('name');
    expect(msg).toBe('');
  });

  it('SHOULD return required message', () => {
    component.form.controls['name'].setErrors({ required: true });
    const msg = component.getErrorMessage('name');
    expect(msg).toBe('This field is required');
  });

  it('SHOULD return minlength message', () => {
    component.form.controls['name'].setErrors({
      minlength: { requiredLength: 3, actualLength: 1 },
    });
    const msg = component.getErrorMessage('name');
    expect(msg).toBe('Minimum 3 characters required');
  });

  it('SHOULD return maxlength message', () => {
    component.form.controls['name'].setErrors({
      maxlength: { requiredLength: 5, actualLength: 10 },
    });
    const msg = component.getErrorMessage('name');
    expect(msg).toBe('Maximum 5 characters allowed');
  });

  it('SHOULD return min value message', () => {
    component.form.controls['age'].setErrors({
      min: { min: 18, actual: -1 },
    });
    const msg = component.getErrorMessage('age');
    expect(msg).toBe('Must be at least 18');
  });

  it('SHOULD return max value message', () => {
    component.form.controls['age'].setErrors({
      max: { max: 100, actual: 120 },
    });
    const msg = component.getErrorMessage('age');
    expect(msg).toBe('Value cannot exceed 100');
  });

  it('SHOULD return fallback message WHEN unknown error exists', () => {
    component.form.controls['role'].setErrors({ custom: true });
    const msg = component.getErrorMessage('role');
    expect(msg).toBe('Invalid value');
  });

  it('SHOULD call addUser on userService when form is valid and submitted', () => {
    component.form.controls['name'].setValue('John Doe');
    component.form.controls['age'].setValue(30);
    component.form.controls['role'].setValue('user');

    component.submit();

    expect(userServiceSpy.addUser).toHaveBeenCalledWith(component.form.value);
  });
});
