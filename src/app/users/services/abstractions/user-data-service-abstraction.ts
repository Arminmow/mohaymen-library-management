import { InjectionToken } from '@angular/core';
import { User } from '../../stores/users.store';

export interface UserDataServiceAbstraction {
  editUser(user: User): void;
  addUser(newUser: User): void;
  deleteUser(userId: number): void;
  setContextUser(user: User | null): void;
}

export const USER_DATA_SERVICE = new InjectionToken<UserDataServiceAbstraction>(
  'USER_DATA_SERVICE'
);
