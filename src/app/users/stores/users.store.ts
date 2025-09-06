import { Injectable, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PersistenceService } from '../services/persitence-service/persistence-service';
import { Subscription } from 'rxjs';

export interface User {
  id: number;
  name: string;
  age: number;
  role: 'user' | 'admin' | 'writer';
}

const STORAGE_KEY = 'users-state';

export interface UsersState {
  users: User[];
}

@Injectable()
export class UsersStore
  extends ComponentStore<UsersState>
  implements OnDestroy
{
  private subscription: Subscription;

  constructor(private persistenceService: PersistenceService) {
    super(
      persistenceService.get<UsersState>(STORAGE_KEY) ?? {
        users: [{ id: 1, name: 'armin', age: 25, role: 'admin' }],
      }
    );

    this.subscription = this.users$.subscribe((users) => {
      this.persistenceService.save(STORAGE_KEY, { users });
    });
  }

  private getNextId(users: User[]): number {
    if (users.length === 0) return 1;
    return Math.max(...users.map((u) => u.id)) + 1;
  }

  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  readonly users$ = this.select((state) => state.users);

  readonly addUser = this.updater((state, newUser: Omit<User, 'id'>) => {
    const nextId = this.getNextId(state.users);

    const userWithId: User = { ...newUser, id: nextId };

    return {
      ...state,
      users: [...state.users, userWithId],
    };
  });

  readonly deleteUser = this.updater((state, id: number) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  }));

  readonly updateUser = this.updater((state, user: User) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  }));
}
