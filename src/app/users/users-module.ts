import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { AddUserForm } from './components/add-user-form/add-user-form';
import { EditUserForm } from './components/edit-user-form/edit-user-form';
import { UserActions } from './components/user-actions/user-actions';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UsersLayout } from './containers/users-layout/users-layout';
import { UserDataService } from './services/user-data-service/user-data-service';
import { UserUiService } from './services/user-ui-service/user-ui-service';
import { UsersRoutingModule } from './users-routing-module';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { MODAL_ABSTRACTION } from './services/abstractions/modal-service-abstraction';
import { USER_DATA_SERVICE } from './services/abstractions/user-data-service-abstraction';

@NgModule({
  declarations: [
    UsersLayout,
    UserTableComponent,
    UserActions,
    AddUserForm,
    EditUserForm,
    UserBooksComponent,
  ],
  imports: [UsersRoutingModule, SharedModule],
  providers: [
    { provide: USER_DATA_SERVICE, useClass: UserDataService },
    { provide: MODAL_ABSTRACTION, useClass: UserUiService },
  ],
})
export class UsersModule {}
