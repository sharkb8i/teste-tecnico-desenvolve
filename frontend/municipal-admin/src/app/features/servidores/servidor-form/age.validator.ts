import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ageRangeValidator(min = 18, max = 75) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as Date | null;
    if (!value) return { required: true };

    const today = new Date();
    const age = today.getFullYear() - value.getFullYear() - (today < new Date(today.getFullYear(), value.getMonth(), value.getDate()) ? 1 : 0);

    if (age < min || age > max) return { ageOutOfRange: true };
    
    return null;
  };
}