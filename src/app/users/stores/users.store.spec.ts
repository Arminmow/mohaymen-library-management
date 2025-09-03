import { TestBed } from '@angular/core/testing';

import { UsersStore } from './users.store';
import { take } from 'rxjs';

describe('UsersStore', () => {
  let service: UsersStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersStore]
    });
    service = TestBed.inject(UsersStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the correct initial state', (done) => {
    service.users$.pipe(take(1)).subscribe((users) => {
      expect(users).toEqual([{ name: 'armin', age: 25, role: 'admin' }]);
      done();
    });
  });
});
