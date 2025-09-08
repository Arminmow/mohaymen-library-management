import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared-module";
import { AddUserForm } from "./components/add-user-form/add-user-form";
import { EditUserForm } from "./components/edit-user-form/edit-user-form";
import { UserActions } from "./components/user-actions/user-actions";
import { UserTable } from "./components/user-table/user-table";
import { UsersLayout } from "./containers/users-layout/users-layout";
import { UserDataService } from "./services/user-data-service/user-data-service";
import { UserUiService } from "./services/user-ui-service/user-ui-service";
import { UsersRoutingModule } from "./users-routing-module";


@NgModule({
  declarations: [
    UsersLayout,
    UserTable,
    UserActions,
    AddUserForm,
    EditUserForm,
  ],
  imports: [UsersRoutingModule, SharedModule],
  providers: [UserDataService , UserUiService ],
})
export class UsersModule {}
