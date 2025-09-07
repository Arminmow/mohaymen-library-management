import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTable } from './book-table';
import { NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { Component, Input } from '@angular/core';
import { Book } from '../../stores/book-store';

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

  beforeEach(async () => {
    nzContextMenuSpy = jasmine.createSpyObj('NzContextMenuService', ['create']);
    await TestBed.configureTestingModule({
      declarations: [
        BookTable,
        NzTableStubComponent,
        NzDividerStubComponent,
        BookActionsStub,
      ],
      providers: [
        { provide: NzContextMenuService, useValue: nzContextMenuSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
