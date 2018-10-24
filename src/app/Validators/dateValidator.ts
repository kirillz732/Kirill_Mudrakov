import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import {DATE_FORMATS} from '../Constants/dateConstant';


export default function (control: AbstractControl): { [key: string]: boolean } | null {
  const dateIn = control.value;
  const dateFormat = moment(dateIn, DATE_FORMATS[0], true).isValid();
  const dateFormat1 = moment(dateIn, DATE_FORMATS[1], true).isValid();
  const dateFormat2 = moment(dateIn, DATE_FORMATS[2], true).isValid();
  if (!dateFormat && !dateFormat1 && !dateFormat2) {
    return {
      'birthday': true,
      'dateOfLogin': true,
      'dateOfNotification': true
    };
  }
  return null;
}
