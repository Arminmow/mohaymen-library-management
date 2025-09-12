import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './users.store';

export interface UserStoreAbstraction {
  readonly users$: Observable<User[]>;
  readonly contextUser$: Observable<User | null>;
  readonly writerUsers$: Observable<User[]>;

  addUser(user: Omit<User, 'id'>): void;
  updateUser(user: User): void;
  deleteUser(userId: number): void;
  setContextUser(user: User | null): void;
}

export const USER_STORE = new InjectionToken<UserStoreAbstraction>('USER_STORE');
