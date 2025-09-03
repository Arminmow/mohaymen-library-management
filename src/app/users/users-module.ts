import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing-module';
import { UsersLayout } from './containers/users-layout/users-layout';
import { UserTable } from './components/user-table/user-table';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { UserService } from './services/user-service';


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
  ],
  providers: [UserService]
})
export class UsersModule { }
