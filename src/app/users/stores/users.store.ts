import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface User {
  id: number;
  name: string;
  age: number;
  role: 'user' | 'admin' | 'writer';
}

export interface UsersState {
  users: User[];
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {
  constructor() {
    super({
      users: [{ id: 1, name: 'armin', age: 25, role: 'admin' }],
    });
  }

  private getNextId(users: User[]): number {
    if (users.length === 0) return 1;
    return Math.max(...users.map((u) => u.id)) + 1;
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
