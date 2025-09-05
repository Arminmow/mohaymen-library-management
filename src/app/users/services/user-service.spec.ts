import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User, UsersStore } from '../stores/users.store';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let nzModalServiceSpy: jasmine.SpyObj<NzModalService>;
  let mockStore: Partial<UsersStore>;

  const mockData: User[] = [
    { id: 1, name: 'Armin', age: 25, role: 'admin' },
    { id: 2, name: 'Bob', age: 30, role: 'user' },
  ];

  mockStore = {
    users$: of(mockData),
    deleteUser: jasmine.createSpy('deleteUser'),
    addUser: jasmine.createSpy('addUser'),
    updateUser: jasmine.createSpy('updateUser'),
  };

  beforeEach(() => {
    nzModalServiceSpy = jasmine.createSpyObj('NzModalService', ['confirm']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: NzModalService, useValue: nzModalServiceSpy },
        { provide: UsersStore, useValue: mockStore },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD call NzModalService.confirm with expected config WHEN confirmDelete is called', () => {
    // Arrange
    const user = mockData[0];
    const expectedConfig = jasmine.objectContaining({
      nzTitle: `Are you sure you want to delete ${user.name}?`,
      nzOkText: 'Yes',
      nzOkDanger: true,
      nzCancelText: 'No',
    });

    // Act
    service.confirmDelete(user);

    // Assert
    expect(nzModalServiceSpy.confirm).toHaveBeenCalledWith(expectedConfig);
  });

  it('SHOULD call NzModalService.confirm with expected config WHEN confirmRoleChange is called', () => {
    // Arrange
    const user = mockData[0];
    const newRole = 'writer';
    const expectedConfig = jasmine.objectContaining({
      nzTitle: `Are you sure you want to change ${user.name}'s role to ${newRole}?`,
      nzOkText: 'Yes',
      nzCancelText: 'No',
    });

    // Act
    service.confirmRoleChange(user, newRole);

    // Assert
    expect(nzModalServiceSpy.confirm).toHaveBeenCalledWith(expectedConfig);
  });
});
