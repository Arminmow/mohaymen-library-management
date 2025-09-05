import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing-module';
import { UsersLayout } from './containers/users-layout/users-layout';
import { UserTable } from './components/user-table/user-table';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { UserService } from './services/user-service';
import { UsersStore } from './stores/users.store';
import { NzContextMenuService, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { UserActions } from './components/user-actions/user-actions';
import { AddUserModal } from './components/add-user-modal/add-user-modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [UsersLayout, UserTable, UserActions, AddUserModal],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzDropDownModule,
    NzMenuModule,
    NzModalModule,
    NzButtonModule
  ],
  providers: [UserService, UsersStore, NzContextMenuService , NzModalService],
})
export class UsersModule {}
