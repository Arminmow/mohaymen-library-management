import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { DashboardLayout } from './containers/dashboard-layout/dashboard-layout';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { BookOutline, UserOutline } from '@ant-design/icons-angular/icons';


@NgModule({
  declarations: [
    DashboardLayout
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule
  ]
})
export class DashboardModule { 
  constructor(private iconService: NzIconService) {
    this.iconService.addIcon(BookOutline, UserOutline);
  }
}
