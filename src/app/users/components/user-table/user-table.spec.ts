import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';

import { UserTable } from './user-table';
import { User, UsersStore } from '../../stores/users.store';
import { NzContextMenuService } from 'ng-zorro-antd/dropdown';

// stub Components
@Component({
  selector: 'nz-table',
  standalone: false,
  template: `
    <table>
      <ng-content></ng-content>
    </table>
  `,
})
class NzTableStubComponent {
  @Input() nzData: any;
  @Input() nzShowPagination: boolean = false;

  get data() {
    return this.nzData;
  }
}

@Component({
  selector: 'app-user-actions',
  standalone: false,
  template: ``,
})
class UserActionsStub {
  @Input() contextUser!: User;
}

@Component({
  selector: 'nz-dropdown-menu',
  standalone: false,
  template: '<ng-content></ng-content>',
  exportAs: 'nzDropdownMenu',
})
class NzDropdownMenuStubComponent {}

@Component({ selector: 'nz-divider', template: '', standalone: false })
class NzDividerStubComponent {}

describe('UserTable', () => {
  let component: UserTable;
  let fixture: ComponentFixture<UserTable>;
  let mockStore: Partial<UsersStore>;
  let nzContextMenuSpy: jasmine.SpyObj<NzContextMenuService>;

  const mockData: User[] = [
    { id: 1, name: 'Armin', age: 25, role: 'admin' },
    { id: 2, name: 'Bob', age: 30, role: 'user' },
  ];

  beforeEach(async () => {
    nzContextMenuSpy = jasmine.createSpyObj('NzContextMenuService', ['create']);

    mockStore = {
      users$: of(mockData),
      deleteUser: jasmine.createSpy('deleteUser'),
      addUser: jasmine.createSpy('addUser'),
      updateUser: jasmine.createSpy('updateUser'),
    };

    await TestBed.configureTestingModule({
      declarations: [
        UserTable,
        NzTableStubComponent,
        NzDividerStubComponent,
        NzDropdownMenuStubComponent,
        UserActionsStub,
      ],
      providers: [
        { provide: UsersStore, useValue: mockStore },
        { provide: NzContextMenuService, useValue: nzContextMenuSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table headers correctly', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toContain('Name');
    expect(headers[1].textContent).toContain('Age');
    expect(headers[2].textContent).toContain('Role');
  });

  it('should render the correct number of rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockData.length);
  });

  it('should render correct data in each row', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    rows.forEach((row: HTMLElement, index: number) => {
      const cells = row.querySelectorAll('td');
      expect(cells[0].textContent).toContain(mockData[index].name);
      expect(cells[1].textContent).toContain(mockData[index].age.toString());
      expect(cells[2].textContent).toContain(mockData[index].role);
    });
  });
});
