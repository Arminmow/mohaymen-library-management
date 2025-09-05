import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserForm } from './edit-user-form';

describe('EditUserForm', () => {
  let component: EditUserForm;
  let fixture: ComponentFixture<EditUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD mark name as invalid when empty', () => {
    component.form.controls['name'].setValue('');
    expect(component.form.controls['name'].valid).toBeFalse();
    expect(component.form.controls['name'].errors).toEqual({ required: true });
  });

  it('SHOULD mark name as invalid when too short', () => {
    component.form.controls['name'].setValue('A');
    const errors = component.form.controls['name'].errors || {};

    expect(component.form.controls['name'].valid).toBeFalse();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['minlength'].requiredLength).toBe(3);
  });

  it('SHOULD mark age as invalid when negative', () => {
    component.form.controls['age'].setValue(10);
    expect(component.form.controls['age'].valid).toBeFalse();
    expect(component.form.controls['age'].errors).toEqual({
      min: { min: 18, actual: 10 },
    });
  });
});
