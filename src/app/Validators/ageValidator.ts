import {AbstractControl} from '@angular/forms';

export default function (control: AbstractControl): { [key: string]: boolean } | null {
  const minAgeValue = 17;
  const maxAgeValue = 66;
  const value = control.value;
  const result = value.split(' ');

  if (value) {

    const fieldValue = Number(value);

    if (isNaN(fieldValue) || fieldValue <= minAgeValue || fieldValue >= maxAgeValue || Number.isInteger(value) || result.length > 1 ) {
      return {
        'age': true
      };
    }
  }
  return null;
}
