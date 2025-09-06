import { TestBed } from '@angular/core/testing';
import { UsersStore, User } from '../../stores/users.store';
import { UserDataService } from './user-data-service';

describe('UserDataService', () => {
  let service: UserDataService;
  let usersStoreSpy: jasmine.SpyObj<UsersStore>;

  beforeEach(() => {
    // create a spy object for UsersStore
    const spy = jasmine.createSpyObj('UsersStore', [
      'addUser',
      'updateUser',
      'deleteUser',
    ]);

    TestBed.configureTestingModule({
      providers: [UserDataService, { provide: UsersStore, useValue: spy }],
    });

    service = TestBed.inject(UserDataService);
    usersStoreSpy = TestBed.inject(UsersStore) as jasmine.SpyObj<UsersStore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call usersStore.updateUser when editUser is called', () => {
    const user: User = { id: 1, name: 'John', role: 'admin', age: 30 };
    service.editUser(user);
    expect(usersStoreSpy.updateUser).toHaveBeenCalledOnceWith(user);
  });

  it('should call usersStore.addUser when addUser is called', () => {
    const user: User = { id: 2, name: 'Jane', role: 'user', age: 25 };
    service.addUser(user);
    expect(usersStoreSpy.addUser).toHaveBeenCalledOnceWith(user);
  });

  it('should call usersStore.deleteUser when deleteUser is called', () => {
    const userId = 1;
    service.deleteUser(userId);
    expect(usersStoreSpy.deleteUser).toHaveBeenCalledOnceWith(userId);
  });
});
