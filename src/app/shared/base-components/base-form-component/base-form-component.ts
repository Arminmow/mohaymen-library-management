import { FormGroup } from '@angular/forms';

export abstract class BaseFormComponent {
  form!: FormGroup;

  // i know this could be done in many other ways like a service and depends on varios factors
  // but since this is a test task 
  // im showing a bit of everything

  protected getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'This field is required';
    if (control.errors['minlength'])
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    if (control.errors['maxlength'])
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    if (control.errors['min'])
      return `Must be at least ${control.errors['min'].min}`;
    if (control.errors['max'])
      return `Value cannot exceed ${control.errors['max'].max}`;

    return 'Invalid value';
  }
}
