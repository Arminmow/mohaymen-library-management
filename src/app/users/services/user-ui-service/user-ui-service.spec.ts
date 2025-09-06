import { TestBed } from '@angular/core/testing';
import { UserUiService } from './user-ui-service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserDataService } from '../user-data-service/user-data-service';
import { User } from '../../stores/users.store';

describe('UserUiService', () => {
  let service: UserUiService;
  let modalSpy: jasmine.SpyObj<NzModalService>;
  let userDataSpy: jasmine.SpyObj<UserDataService>;

  beforeEach(() => {
    modalSpy = jasmine.createSpyObj('NzModalService', ['confirm']);
    userDataSpy = jasmine.createSpyObj('UserDataService', [
      'editUser',
      'deleteUser',
    ]);

    // Automatically call nzOnOk when confirm is called
    modalSpy.confirm.and.callFake((options: any) => options.nzOnOk());

    TestBed.configureTestingModule({
      providers: [
        UserUiService,
        { provide: NzModalService, useValue: modalSpy },
        { provide: UserDataService, useValue: userDataSpy },
      ],
    });

    service = TestBed.inject(UserUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call deleteUser when confirmDelete is called with a user', () => {
    const user: User = { id: 1, name: 'John', role: 'admin', age: 30 };

    service.confirmDelete(user);

    expect(modalSpy.confirm).toHaveBeenCalledWith(
      jasmine.objectContaining({
        nzTitle: `Are you sure you want to delete ${user.name}?`,
        nzOkText: 'Yes',
        nzOkDanger: true,
        nzCancelText: 'No',
      })
    );
    expect(userDataSpy.deleteUser).toHaveBeenCalledWith(user.id);
  });

  it('should call editUser with updated role when confirmRoleChange is called with a user and new role', () => {
    const user: User = { id: 2, name: 'Jane', role: 'user', age: 25 };
    const newRole: User['role'] = 'admin';

    service.confirmRoleChange(user, newRole);

    expect(modalSpy.confirm).toHaveBeenCalledWith(
      jasmine.objectContaining({
        nzTitle: `Are you sure you want to change ${user.name}'s role to ${newRole}?`,
        nzOkText: 'Yes',
        nzCancelText: 'No',
      })
    );
    expect(userDataSpy.editUser).toHaveBeenCalledWith({
      ...user,
      role: newRole,
    });
  });
});
