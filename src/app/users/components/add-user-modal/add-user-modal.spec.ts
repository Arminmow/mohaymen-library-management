import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserModal } from './add-user-modal';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { By } from '@angular/platform-browser';

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

@Component({
  selector: 'button[nz-button]',
  template: '<ng-content></ng-content>',
  standalone: false,
})
class NzButtonStub {
  @Input() nzType?: string;
}

describe('AddUserModal', () => {
  let component: AddUserModal;
  let fixture: ComponentFixture<AddUserModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserModal, NzButtonStub, NzModalStub],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserModal);
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
    fixture.detectChanges();
    // Assert
    expect(component.isVisible).toBe(true);
  });

  it('should set isVisible to false when modal emits nzOnCancel', () => {
    component.isVisible = true;
    fixture.detectChanges();

    // cleaner query
    const modalEl = fixture.debugElement.query(By.directive(NzModalStub));
    const modalInstance = modalEl.componentInstance as NzModalStub;

    modalInstance.nzOnCancel.emit();
    expect(component.isVisible).toBe(false);
  });
});
