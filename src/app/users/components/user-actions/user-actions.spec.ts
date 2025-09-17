import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { UserActionsComponent } from './user-actions.component';
import { User } from '../../stores/users.store';
import { UserUiService } from '../../services/user-ui-service/user-ui-service';
import { MODAL_ABSTRACTION } from '../../services/abstractions/modal-service-abstraction';

// stub components
@Component({
  selector: 'nz-dropdown-menu',
  template: '',
  standalone: false,
  exportAs: 'nzDropdownMenu',
})
class NzDropDownMenuStub {}

@Component({
  selector: 'app-generic-modal',
  template: '',
  standalone: false,
})
class UserGenericModalStub {}

@Component({
  selector: 'app-edit-user-form',
  template: '',
  standalone: false,
})
class EditUserFormStub {
  @Input() user!: User;
}

describe('UserActions', () => {
  let component: UserActionsComponent;
  let fixture: ComponentFixture<UserActionsComponent>;
  let userServiceSpy: jasmine.SpyObj<UserUiService>;

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
      declarations: [
        UserActionsComponent, 
        NzDropDownMenuStub, 
        UserGenericModalStub, 
        EditUserFormStub
      ],
      providers: [{ provide: MODAL_ABSTRACTION, useValue: userServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD call confirmDelete with correct user WHEN showDeleteConfirm is called', () => {
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
