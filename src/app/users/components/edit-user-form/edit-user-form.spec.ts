import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { EditUserForm } from './edit-user-form';
import { User, UsersStore } from '../../stores/users.store';
import { UserDataService } from '../../services/user-data-service/user-data-service';

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

  // -------------------------
  // TestBed Setup
  // -------------------------
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserDataService', ['editUser']);

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

  // -------------------------
  // Component Creation
  // -------------------------
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------
  // Form Initialization
  // -------------------------
  describe('Form Initialization', () => {
    it('should initialize the form with input user values', () => {
      expect(component.form.value).toEqual({
        name: mockUser.name,
        age: mockUser.age,
      });
    });

    it('should patch form when user input changes', () => {
      const newUser: User = { id: 2, name: 'John', age: 30, role: 'writer' };
      fixture.componentRef.setInput('user', newUser);

      component.ngOnChanges({
        user: {
          currentValue: newUser,
          previousValue: mockUser,
          firstChange: false,
          isFirstChange: () => false,
        },
      });

      expect(component.form.value).toEqual({
        name: 'John',
        age: 30,
      });
    });
  });

  // -------------------------
  // Form Validation
  // -------------------------
  describe('Form Validation', () => {
    it('should mark name as invalid when empty', () => {
      component.form.controls['name'].setValue('');

      expect(component.form.controls['name'].valid).toBeFalse();
      expect(component.form.controls['name'].errors).toEqual({
        required: true,
      });
    });

    it('should mark name as invalid when too short', () => {
      component.form.controls['name'].setValue('A');

      const errors = component.form.controls['name'].errors || {};
      expect(component.form.controls['name'].valid).toBeFalse();
      expect(errors['minlength']).toBeTruthy();
      expect(errors['minlength'].requiredLength).toBe(3);
    });

    it('should mark age as invalid when below minimum', () => {
      component.form.controls['age'].setValue(10);

      expect(component.form.controls['age'].valid).toBeFalse();
      expect(component.form.controls['age'].errors).toEqual({
        min: { min: 18, actual: 10 },
      });
    });
  });

  // -------------------------
  // Submit Behavior
  // -------------------------
  describe('Submit', () => {
    beforeEach(() => {
      // Set valid form values
      component.form.controls['name'].setValue('John Doe');
      component.form.controls['age'].setValue(30);
    });

    it('should call editUser on submit when form is valid', () => {
      component.submit();

      expect(userServiceSpy.editUser).toHaveBeenCalledWith({
        id: component.user.id,
        name: 'John Doe',
        age: 30,
        role: component.user.role,
      });
    });

    it('should emit onClose when form is valid and submitted', () => {
      const emitSpy = spyOn(component.onClose, 'emit');

      component.submit();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
