import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface User {
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
      users: [{ name: 'armin', age: 25, role: 'admin' }],
    });
  }

  readonly users$ = this.select((state) => state.users);
}
