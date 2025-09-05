import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLayout } from './users-layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Component } from '@angular/core';

@Component({ selector: 'app-user-table', template: '', standalone: false })
class UsersTableStub {}

@Component({
  selector: 'app-add-user-modal',
  standalone: false,
  template: '',
})
class AddUserModalStub {}

describe('UsersLayout', () => {
  let component: UsersLayout;
  let fixture: ComponentFixture<UsersLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersLayout, UsersTableStub , AddUserModalStub],
      imports: [NzTableModule, NzDividerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
