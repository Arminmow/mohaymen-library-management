import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookActions } from './book-actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component } from '@angular/core';

@Component({
  selector: 'nz-dropdown-menu',
  template: '',
  standalone: false,
  exportAs: 'nzDropdownMenu',
})
class NzDropDownMenuStub {}


describe('BookActions', () => {
  let component: BookActions;
  let fixture: ComponentFixture<BookActions>;
  let modalServiceSpy : jasmine.SpyObj<NzModalService>

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('NzModalService', ['confirm']);
    await TestBed.configureTestingModule({
      declarations: [BookActions, NzDropDownMenuStub],
      providers: [
        { provide: NzModalService, useValue: modalServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
