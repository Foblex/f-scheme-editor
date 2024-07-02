import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EErrorKeys } from '@resources';

const VALID_FILE_NAME_REGEXP = /^[a-zA-Z0-9._-]+$/;

export class CoreValidators {

  public static unique(existingNames: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const isValid = !existingNames.includes(control.value?.toLowerCase()?.trim());
      return !isValid ? { [ EErrorKeys.NOT_UNIQUE ]: {} } : null;
    }
  }

  public static validFileName(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const isValid = VALID_FILE_NAME_REGEXP.exec(control.value.trim());
      return !isValid ? { [ EErrorKeys.INVALID_FILE_NAME ]: {} } : null;
    }
  }
}
