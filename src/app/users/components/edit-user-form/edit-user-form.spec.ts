import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { EditUserFormComponent } from './edit-user-form.component';
import { User, UsersStore } from '../../stores/users.store';
import { UserDataService } from '../../services/user-data-service/user-data-service';
import { USER_DATA_SERVICE } from '../../services/abstractions/user-data-service-abstraction';
import { USER_STORE } from '../../stores/user-store-abstraction';

describe('EditUserForm', () => {
  let component: EditUserFormComponent;
  let fixture: ComponentFixture<EditUserFormComponent>;
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
    userServiceSpy = jasmine.createSpyObj('UserDataService', ['editUser']);

    await TestBed.configureTestingModule({
      declarations: [EditUserFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: USER_DATA_SERVICE, useValue: userServiceSpy },
        { provide: USER_STORE, useValue: usersStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize the form with input user values', () => {
      expect(component.form.value).toEqual({
        name: mockUser.name,
        age: mockUser.age,
      });
    });
  });

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

  describe('Submit', () => {
    beforeEach(() => {
      component.form.controls['name'].setValue('John Doe');
      component.form.controls['age'].setValue(30);
    });

    it('should call editUser on submit when form is valid', () => {
      component.submit();

      expect(userServiceSpy.editUser).toHaveBeenCalledWith({
        id: component.currentUser.id,
        name: 'John Doe',
        age: 30,
        role: component.currentUser.role,
      });
    });

    it('should emit onClose when form is valid and submitted', () => {
      const emitSpy = spyOn(component.onClose, 'emit');

      component.submit();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
