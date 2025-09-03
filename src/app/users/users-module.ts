import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing-module';
import { UsersLayout } from './containers/users-layout/users-layout';
import { UserTable } from './components/user-table/user-table';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';


@NgModule({
  declarations: [
    UsersLayout,
    UserTable
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NzTableModule,
    NzDividerModule
  ]
})
export class UsersModule { }
