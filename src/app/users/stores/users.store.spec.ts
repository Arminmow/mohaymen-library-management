import { TestBed } from '@angular/core/testing';

import { User, UsersStore } from './users.store';
import { take } from 'rxjs';

describe('UsersStore', () => {
  let service: UsersStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersStore],
    });
    service = TestBed.inject(UsersStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the correct initial state', (done) => {
    service.users$.pipe(take(1)).subscribe((users) => {
      expect(users).toEqual([{ id: 1, name: 'armin', age: 25, role: 'admin' }]);
      done();
    });
  });

  it('SHOULD add new user WHEN addUser is called', (done) => {
    // Arrange
    const newUser: User = { id: 2, name: 'test', age: 999, role: 'admin' };

    // Act
    service.addUser(newUser);

    // Assert
    service.users$.pipe(take(1)).subscribe((users) => {
      expect(users).toContain(newUser);
      done();
    });
  });

  it('SHOULD remove user WHEN deleteUser is called', (done) => {
    // Arrange

    // Act
    service.deleteUser(1);

    // Assert
    service.users$.pipe(take(1)).subscribe((users) => {
      expect(users).toEqual([]);
      done();
    });
  });

  it('SHOULD update user WHEN updateUser is called', (done) => {
    // Arrange
    const updatedUser: User = {
      id: 1,
      name: 'armin',
      age: 25,
      role: 'user',
    };

    // Act

    service.updateUser(updatedUser);

    // Assert
    service.users$.pipe(take(1)).subscribe((users) => {
      expect(users[0].role).toBe('user');
      done();
    });
  });
});
