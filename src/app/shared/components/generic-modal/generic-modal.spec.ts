import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericModal } from './generic-modal';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nz-modal',
  template: '<ng-content></ng-content>',
  standalone: false,
})
class NzModalStub {
  @Input() nzVisible = false;
  @Input() nzFooter: string = '';
  @Input() nzTitle: string = '';
  @Output() nzOnCancel = new EventEmitter<void>();
}

describe('GenericModal', () => {
  let component: GenericModal;
  let fixture: ComponentFixture<GenericModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericModal , NzModalStub],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericModal);
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

  it('SHOULD set isVisible to false WHEN hideModal is called', () => {
    // Arrange
    component.isVisible = true;

    // Act
    component.hideModal();

    // Assert
    expect(component.isVisible).toBe(false);
  });
});
