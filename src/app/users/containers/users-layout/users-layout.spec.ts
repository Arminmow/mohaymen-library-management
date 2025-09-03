import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLayout } from './users-layout';
import { UserTable } from '../../components/user-table/user-table';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';

describe('UsersLayout', () => {
  let component: UsersLayout;
  let fixture: ComponentFixture<UsersLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersLayout , UserTable],
      imports: [NzTableModule , NzDividerModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
