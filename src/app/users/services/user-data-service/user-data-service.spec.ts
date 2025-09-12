import { TestBed } from '@angular/core/testing';
import { UserDataService } from './user-data-service';
import { USER_STORE, UserStoreAbstraction } from '../../stores/user-store-abstraction';
import { User } from '../../stores/users.store';

describe('UserDataService', () => {
  let service: UserDataService;
  let usersStoreSpy: jasmine.SpyObj<UserStoreAbstraction>;

  beforeEach(() => {
    usersStoreSpy = jasmine.createSpyObj('UserStore', [
      'addUser',
      'updateUser',
      'deleteUser',
      'setContextUser',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserDataService,
        { provide: USER_STORE, useValue: usersStoreSpy },
      ],
    });

    service = TestBed.inject(UserDataService);
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

  it('should call usersStore.setContextUser when setContextUser is called', () => {
    const user: User = { id: 3, name: 'Alice', role: 'user', age: 28 };
    service.setContextUser(user);
    expect(usersStoreSpy.setContextUser).toHaveBeenCalledOnceWith(user);
  });
});
