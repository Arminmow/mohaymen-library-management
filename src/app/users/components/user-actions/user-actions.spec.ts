import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActions } from './user-actions';
import { UserService } from '../../services/user-service';
import { Component, Input } from '@angular/core';
import { User } from '../../stores/users.store';

@Component({
  selector: 'nz-dropdown-menu',
  template: '',
  standalone: false,
  exportAs: 'nzDropdownMenu',
})
class NzDropDownMenuStub {}

@Component({
  selector: 'app-edit-user-modal',
  template: '',
  standalone: false
})
class UserEditModalStub {
  @Input() user!: User;
}

describe('UserActions', () => {
  let component: UserActions;
  let fixture: ComponentFixture<UserActions>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  const mockUser: User = {
    id: 1,
    name: 'armin',
    age: 25,
    role: 'admin',
  };

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'confirmDelete',
      'confirmRoleChange',
    ]);

    await TestBed.configureTestingModule({
      declarations: [UserActions, NzDropDownMenuStub , UserEditModalStub],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD call confirmDelete with corret user WHEN showDeleteConfirm is called', () => {
    // Arrange
    fixture.componentRef.setInput('contextUser', mockUser);

    // Act
    component.showDeleteConfirm();

    // Assert
    expect(userServiceSpy.confirmDelete).toHaveBeenCalledWith(mockUser);
  });

  it('SHOULD call confirmRoleChange with correct inputs WHEN onChangeRole is called', () => {
    // Arrange
    fixture.componentRef.setInput('contextUser', mockUser);
    const newRole: User['role'] = 'writer';

    // Act
    component.onChangeRole(newRole);

    // Assert
    expect(userServiceSpy.confirmRoleChange).toHaveBeenCalledWith(
      mockUser,
      newRole
    );
  });
});
