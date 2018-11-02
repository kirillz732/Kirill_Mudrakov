import {AbstractControl} from '@angular/forms';

export default function (control: AbstractControl): Promise<any> {
  const value = control.value;
  const result = value.split(' ');
  const symbols = /^[A-Z](?:[a-z]+)?(?: [A-Z](?:[a-z]+)?)?$/;
  return new Promise((resolve) => {
    setTimeout(() => {
      if (result.length > 2 || !value.match(symbols)) {
        resolve({
          'moreTwoWords': true
        });
      }
      resolve(null);
    }, 3000);
  });
}
