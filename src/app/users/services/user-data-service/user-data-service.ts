import { Injectable } from '@angular/core';
import { User, UsersStore } from '../../stores/users.store';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
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
}
