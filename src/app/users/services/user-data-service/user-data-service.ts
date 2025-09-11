import { Inject, Injectable } from '@angular/core';
import { User } from '../../stores/users.store';
import { UserDataServiceAbstraction } from '../abstractions/user-data-service-abstraction';
import { USER_STORE, UserStoreAbstraction } from '../../stores/user-store-abstraction';

@Injectable()
export class UserDataService implements UserDataServiceAbstraction {
  constructor(@Inject(USER_STORE) public userStore: UserStoreAbstraction,) {}

  editUser(user: User) {
    this.userStore.updateUser(user);
  }

  addUser(newUser: User) {
    this.userStore.addUser(newUser);
  }

  deleteUser(userId: number) {
    this.userStore.deleteUser(userId);
  }

  setContextUser(user: User | null) {
    this.userStore.setContextUser(user);
  }
}
