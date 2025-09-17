import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { User } from '../../stores/users.store';
import { NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { USER_STORE, UserStoreAbstraction } from '../../stores/user-store-abstraction';
import { USER_DATA_SERVICE, UserDataServiceAbstraction } from '../../services/abstractions/user-data-service-abstraction';
import { UserTableComponent } from './user-table.component';

// Stub Components
@Component({
  selector: 'nz-table',
  template: `<table><ng-content></ng-content></table>`,
  standalone : false
})
class NzTableStubComponent {
  @Input() nzData: any;
  @Input() nzShowPagination = false;
}

@Component({ selector: 'app-user-actions', template: `` , standalone : false})
class UserActionsStub {
  @Input() contextUser!: User;
}

@Component({
  selector: 'nz-dropdown-menu',
  template: '<ng-content></ng-content>',
  exportAs: 'nzDropdownMenu',
  standalone: false
})
class NzDropdownMenuStubComponent {}

@Component({ selector: 'nz-divider', template: '' , standalone : false})
class NzDividerStubComponent {}

describe('UserTable', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let mockStore: Partial<UserStoreAbstraction>;
  let nzContextMenuSpy: jasmine.SpyObj<NzContextMenuService>;
  let userDataServiceSpy: jasmine.SpyObj<UserDataServiceAbstraction>;

  const titleCasePipe = new TitleCasePipe();

  const mockData: User[] = [
    { id: 1, name: 'Armin', age: 25, role: 'admin' },
    { id: 2, name: 'Bob', age: 30, role: 'user' },
  ];

  beforeEach(async () => {
    nzContextMenuSpy = jasmine.createSpyObj('NzContextMenuService', ['create']);
    userDataServiceSpy = jasmine.createSpyObj('UserDataService', ['setContextUser']);

    mockStore = {
      users$: of(mockData),
      deleteUser: jasmine.createSpy('deleteUser'),
      addUser: jasmine.createSpy('addUser'),
      updateUser: jasmine.createSpy('updateUser'),
    };

    await TestBed.configureTestingModule({
      declarations: [
        UserTableComponent,
        NzTableStubComponent,
        NzDividerStubComponent,
        NzDropdownMenuStubComponent,
        UserActionsStub,
      ],
      providers: [
        { provide: USER_STORE, useValue: mockStore },
        { provide: NzContextMenuService, useValue: nzContextMenuSpy },
        { provide: USER_DATA_SERVICE, useValue: userDataServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign users$ from the store', (done) => {
    component.users$.subscribe((users) => {
      expect(users).toEqual(mockData);
      done();
    });
  });

  it('should call setContextUser and create context menu on contextMenu()', () => {
    const mockEvent = new MouseEvent('click');
    const mockMenu: any = {};
    const user = mockData[0];

    component.contextMenu(mockEvent, mockMenu, user);

    expect(userDataServiceSpy.setContextUser).toHaveBeenCalledOnceWith(user);
    expect(nzContextMenuSpy.create).toHaveBeenCalledOnceWith(mockEvent, mockMenu);
  });
});
