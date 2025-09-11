import { Injectable } from '@angular/core';
import { User, UsersStore } from '../../stores/users.store';
import { UserDataServiceAbstraction } from '../abstractions/user-data-service-abstraction';

@Injectable()
export class UserDataService implements UserDataServiceAbstraction {
  constructor(private usersStore: UsersStore) {}

  editUser(user: User) {
    this.usersStore.updateUser(user);
  }

  addUser(newUser: User) {
    this.usersStore.addUser(newUser);
  }

  deleteUser(userId: number) {
    this.usersStore.deleteUser(userId);
  }

  setContextUser(user: User | null) {
    this.usersStore.setContextUser(user);
  }
}
