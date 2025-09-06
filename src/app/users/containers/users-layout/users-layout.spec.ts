import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLayout } from './users-layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Component, Directive, Input } from '@angular/core';
import { User } from '../../stores/users.store';

@Component({ selector: 'app-user-table', template: '', standalone: false })
class UsersTableStub {}

@Component({
  selector: 'app-add-user-modal',
  standalone: false,
  template: '',
})
class AddUserModalStub {}

@Component({
  selector: 'app-generic-modal',
  template: '',
  standalone: false,
})
class UserGenericModalStub {}

@Component({
  selector: 'app-add-user-form',
  template: '',
  standalone: false,
})
class AddUserFormStub {
  @Input() user!: User;
}

@Directive({
  selector: '[nz-button]',
  standalone: false,
})
class NzButtonStubDirective {
  @Input() nzType: string | undefined;
}

describe('UsersLayout', () => {
  let component: UsersLayout;
  let fixture: ComponentFixture<UsersLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UsersLayout,
        UsersTableStub,
        AddUserModalStub,
        UserGenericModalStub,
        AddUserFormStub,
        NzButtonStubDirective,
      ],
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
