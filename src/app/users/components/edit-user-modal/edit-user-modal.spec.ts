import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserModal } from './edit-user-modal';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nz-modal',
  template: '<ng-content></ng-content>',
  standalone: false,
})
class NzModalStub {
  @Input() nzVisible = false;
  @Input() nzFooter: string = '';
  @Output() nzOnCancel = new EventEmitter<void>();
}

describe('EditUserModal', () => {
  let component: EditUserModal;
  let fixture: ComponentFixture<EditUserModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserModal, NzModalStub],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserModal);
    component = fixture.componentInstance;
    component.isVisible = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD set isVisible to true WHEN showModal is called', () => {
    // Arrange
    // Act
    component.showModal();
    // Assert
    expect(component.isVisible).toBe(true);
  });

  it('SHOULD set isVisible to false WHEN handleCancel is called', () => {
    // Arrange
    component.isVisible = true;

    // Act
    fixture.detectChanges();
    component.handleCancel();
    fixture.detectChanges();

    // Assert
    expect(component.isVisible).toBe(false);
  });
});
