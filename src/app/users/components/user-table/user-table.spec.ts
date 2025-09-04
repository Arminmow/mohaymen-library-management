import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTable } from './user-table';
import { User, UsersStore } from '../../stores/users.store';
import { Observable, of } from 'rxjs';
import { NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'nz-table',
  standalone: false,
  template: `<table>
    <ng-content></ng-content>
  </table>`,
})
class NzTableStubComponent {
  @Input('nzData') nzData: any;

  get data() {
    return this.nzData;
  }
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
      users$: of(mockData) as Observable<User[]>,
    };

    await TestBed.configureTestingModule({
      declarations: [
        UserTable,
        NzTableStubComponent,
        NzDividerStubComponent,
        NzDropdownMenuStubComponent,
      ],
      imports: [],
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
    expect(headers.length).toBe(4);
    expect(headers[0].textContent).toContain('Name');
    expect(headers[1].textContent).toContain('Age');
    expect(headers[2].textContent).toContain('Role');
    expect(headers[3].textContent).toContain('Action');
  });

  it('should render the correct number of rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockData.length); // use mockData here
  });

  it('should render correct data in each row', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    rows.forEach((row: HTMLElement, index: number) => {
      const cells = row.querySelectorAll('td');
      expect(cells[0].textContent).toContain(mockData[index].name);
      expect(cells[1].textContent).toContain(mockData[index].age.toString());
      expect(cells[2].textContent).toContain(mockData[index].role);
      expect(cells[3].textContent).toContain(
        `Action 一 ${mockData[index].name}`
      );
      expect(cells[3].textContent).toContain('Delete');
    });
  });

  it('SHOULD set contextUser AND call NzContextMenuService.create WHEN contextMenu is invoked', () => {
    // Arrange
    const user = mockData[1];
    const menuDebug =
      fixture.debugElement.nativeElement.querySelector('nz-dropdown-menu');
    expect(menuDebug).toBeTruthy();
    const menuInstance = menuDebug as any;
    const fakeEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
    });

    // Act
    component.contextMenu(fakeEvent, menuInstance, user);

    // Assert
    expect(component.contextUser).toBe(user);
    expect(nzContextMenuSpy.create).toHaveBeenCalledWith(
      fakeEvent,
      menuInstance
    );
  });
});
