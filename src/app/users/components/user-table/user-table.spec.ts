import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTable } from './user-table';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';

describe('UserTable', () => {
  let component: UserTable;
  let fixture: ComponentFixture<UserTable>;

  const mockData: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTable],
      imports: [NzTableModule, NzDividerModule],
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
    expect(headers[2].textContent).toContain('Address');
    expect(headers[3].textContent).toContain('Action');
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
      expect(cells[2].textContent).toContain(mockData[index].address);
      expect(cells[3].textContent).toContain(
        `Action 一 ${mockData[index].name}`
      );
      expect(cells[3].textContent).toContain('Delete');
    });
  });
});
