import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleCasePipe } from '@angular/common';
import { BookTable } from './book-table';
import { NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { Component, Input } from '@angular/core';
import { Book, BookStore } from '../../stores/book-store';
import { of } from 'rxjs';

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

@Component({ selector: 'nz-divider', template: '', standalone: false })
class NzDividerStubComponent {}

@Component({
  selector: 'app-book-actions',
  standalone: false,
  template: ``,
})
class BookActionsStub {
  @Input() contextBook!: Book;
}

describe('BookTable', () => {
  let component: BookTable;
  let fixture: ComponentFixture<BookTable>;
  let nzContextMenuSpy: jasmine.SpyObj<NzContextMenuService>;
  let mockStore: Partial<BookStore>;

  const titleCasePipe = new TitleCasePipe();

  const mockData: Book[] = [
    {
      id: 1,
      title: 'Armin book',
      author: 'armin',
      publishedDate: new Date('2023-01-01'),
      author_id: 1,
    },
    {
      id: 2,
      title: 'Bob book',
      author: 'bob',
      publishedDate: new Date('2023-01-02'),
      author_id: 1,
    },
  ];

  beforeEach(async () => {
    nzContextMenuSpy = jasmine.createSpyObj('NzContextMenuService', ['create']);

    mockStore = {
      books$: of(mockData),
      deleteBook: jasmine.createSpy('deleteBook'),
      addBook: jasmine.createSpy('addBook'),
      editBook: jasmine.createSpy('editBook'),
    };
    await TestBed.configureTestingModule({
      declarations: [
        BookTable,
        NzTableStubComponent,
        NzDividerStubComponent,
        BookActionsStub,
      ],
      providers: [
        { provide: NzContextMenuService, useValue: nzContextMenuSpy },
        { provide: BookStore, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table headers correctly', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(4);
    expect(headers[0].textContent).toContain('Title');
    expect(headers[1].textContent).toContain('Author');
    expect(headers[2].textContent).toContain('Published Date');
    expect(headers[3].textContent).toContain('Tags');
  });

  it('should render the correct number of rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockData.length);
  });

  it('should render correct data in each row', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    rows.forEach((row: HTMLElement, index: number) => {
      const cells = row.querySelectorAll('td');
      expect(cells[0].textContent).toContain(
        titleCasePipe.transform(mockData[index].title)
      );
      expect(cells[1].textContent).toContain(
        titleCasePipe.transform(mockData[index].author)
      );
    });
  });
});
