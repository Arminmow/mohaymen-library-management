import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing-module';
import { UsersLayout } from './containers/users-layout/users-layout';
import { UserTable } from './components/user-table/user-table';
import { UserService } from './services/user-service';
import { UsersStore } from './stores/users.store';
import { UserActions } from './components/user-actions/user-actions';
import { AddUserForm } from './components/add-user-form/add-user-form';
import { EditUserForm } from './components/edit-user-form/edit-user-form';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [
    UsersLayout,
    UserTable,
    UserActions,
    AddUserForm,
    EditUserForm,
  ],
  imports: [UsersRoutingModule, SharedModule],
  providers: [UserService, UsersStore],
})
export class UsersModule {}
