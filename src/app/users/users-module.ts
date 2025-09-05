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
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserActions } from './components/user-actions/user-actions';

@NgModule({
  declarations: [UsersLayout, UserTable, UserActions],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzDropDownModule,
    NzMenuModule,
  ],
  providers: [UserService, UsersStore, NzContextMenuService , NzModalService],
})
export class UsersModule {}
