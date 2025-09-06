import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserForm } from './edit-user-form';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User, UsersStore } from '../../stores/users.store';
import { UserDataService } from '../../services/user-data-service/user-data-service';
import { of } from 'rxjs';

describe('EditUserForm', () => {
  let component: EditUserForm;
  let fixture: ComponentFixture<EditUserForm>;
  let userServiceSpy: jasmine.SpyObj<UserDataService>;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    age: 30,
    role: 'user',
  };

  const usersStoreMock = {
    contextUser$: of(mockUser),
  };

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['editUser']);

    await TestBed.configureTestingModule({
      declarations: [EditUserForm],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserDataService, useValue: userServiceSpy },
        { provide: UsersStore, useValue: usersStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', mockUser);
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

  it('SHOULD call editUser on submit WHEN form is valid', () => {
    // Arrange
    component.form.controls['name'].setValue('John Doe');
    component.form.controls['age'].setValue(30);

    // Act
    component.submit();

    // Assert
    expect(userServiceSpy.editUser).toHaveBeenCalledWith({
      id: component.user.id,
      name: 'John Doe',
      age: 30,
      role: component.user.role,
    });
  });

  it('SHOULD emit onClose WHEN form is valid and submitted', () => {
    // Arrange
    component.form.controls['name'].setValue('John Doe');
    component.form.controls['age'].setValue(30);

    const emitSpy = spyOn(component.onClose, 'emit');

    // Act
    component.submit();

    // Assert
    expect(emitSpy).toHaveBeenCalled();
    // optionally
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});
