import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared-module";
import { AddUserForm } from "./components/add-user-form/add-user-form";
import { EditUserForm } from "./components/edit-user-form/edit-user-form";
import { UserActions } from "./components/user-actions/user-actions";
import { UserTable } from "./components/user-table/user-table";
import { UsersLayout } from "./containers/users-layout/users-layout";
import { UserDataService } from "./services/user-data-service/user-data-service";
import { UserUiService } from "./services/user-ui-service/user-ui-service";
import { UsersStore } from "./stores/users.store";
import { UsersRoutingModule } from "./users-routing-module";
import { PersistenceService } from "./services/persitence-service/persistence-service";


@NgModule({
  declarations: [
    UsersLayout,
    UserTable,
    UserActions,
    AddUserForm,
    EditUserForm,
  ],
  imports: [UsersRoutingModule, SharedModule],
  providers: [ UsersStore , UserDataService , UserUiService , PersistenceService],
})
export class UsersModule {}
