import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UsersStore } from './users/stores/users.store';
import { USER_STORE } from './users/stores/user-store-abstraction';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzModalModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {provide : NZ_I18N , useValue : en_US},
    { provide: USER_STORE, useExisting: UsersStore }
  ],
  bootstrap: [App]
})
export class AppModule { }
