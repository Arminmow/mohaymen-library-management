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
import { AddUserForm } from './components/add-user-form/add-user-form';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  declarations: [UsersLayout, UserTable, UserActions, AddUserModal, AddUserForm],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzDropDownModule,
    NzMenuModule,
    NzModalModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    NzInputNumberModule
  ],
  providers: [UserService, UsersStore, NzContextMenuService , NzModalService ,FormBuilder],
})
export class UsersModule {}
