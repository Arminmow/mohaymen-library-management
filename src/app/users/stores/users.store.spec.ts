import { TestBed } from '@angular/core/testing';
import { UsersStore, User, UsersState } from './users.store';
import { PersistenceService } from '../services/persitence-service/persistence-service';
import { of, firstValueFrom } from 'rxjs';

describe('UsersStore', () => {
  let store: UsersStore;
  let persistenceService: jasmine.SpyObj<PersistenceService>;

  beforeEach(() => {
    const persistenceSpy = jasmine.createSpyObj('PersistenceService', [
      'get',
      'save',
      'remove',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UsersStore,
        { provide: PersistenceService, useValue: persistenceSpy },
      ],
    });

    store = TestBed.inject(UsersStore);
    persistenceService = TestBed.inject(
      PersistenceService
    ) as jasmine.SpyObj<PersistenceService>;

    // reset spies before each test
    persistenceService.get.calls.reset();
    persistenceService.save.calls.reset();
  });

  it('SHOULD initialize with persisted state WHEN persistence contains data', async () => {
    // Arrange
    const fakeState : UsersState = { users: [{ id: 99, name: 'armin', age: 25, role: 'admin' }] };
    persistenceService.get.and.returnValue(fakeState);

    // recreate store to trigger constructor logic with mocked data
    store = new UsersStore(persistenceService);

    // Act
    const users = await firstValueFrom(store.users$);

    // Assert
    expect(users).toEqual(fakeState.users);
  });

  it('SHOULD add new user WHEN addUser is called', async () => {
    // Arrange
    const newUser = { name: 'test', age: 42, role: 'writer' } as Omit<User, 'id'>;

    // Act
    store.addUser(newUser);
    const users = await firstValueFrom(store.users$);

    // Assert
    expect(users.some((u) => u.name === 'test' && u.role === 'writer')).toBeTrue();
    expect(persistenceService.save).toHaveBeenCalled();
  });

  it('SHOULD remove user WHEN deleteUser is called', async () => {
    // Act
    store.deleteUser(1);
    const users = await firstValueFrom(store.users$);

    // Assert
    expect(users.find((u) => u.id === 1)).toBeUndefined();
    expect(persistenceService.save).toHaveBeenCalled();
  });

  it('SHOULD update user WHEN updateUser is called', async () => {
    // Arrange
    const updatedUser: User = { id: 1, name: 'armin', age: 25, role: 'user' };

    // Act
    store.updateUser(updatedUser);
    const users = await firstValueFrom(store.users$);

    // Assert
    expect(users[0]).toEqual(updatedUser);
    expect(persistenceService.save).toHaveBeenCalled();
  });
});
