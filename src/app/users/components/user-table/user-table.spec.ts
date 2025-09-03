import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTable } from './user-table';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { User, UsersStore } from '../../stores/users.store';
import { Observable, of } from 'rxjs';

describe('UserTable', () => {
  let component: UserTable;
  let fixture: ComponentFixture<UserTable>;
  let mockStore: Partial<UsersStore>;

  const mockData: User[] = [
    { id: 1, name: 'Armin', age: 25, role: 'admin' },
    { id: 2, name: 'Bob', age: 30, role: 'user' },
  ];

  beforeEach(async () => {
    mockStore = {
      users$: of(mockData) as Observable<User[]>,
    };

    await TestBed.configureTestingModule({
      declarations: [UserTable],
      imports: [NzTableModule, NzDividerModule],
      providers: [{ provide: UsersStore, useValue: mockStore }],
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
      expect(cells[3].textContent).toContain(`Action 一 ${mockData[index].name}`);
      expect(cells[3].textContent).toContain('Delete');
    });
  });
});
