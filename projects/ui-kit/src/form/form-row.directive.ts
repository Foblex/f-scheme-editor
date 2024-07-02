import { Directive } from '@angular/core';

@Directive({
  selector: 'div[formRow]',
  standalone: true,
  host: {
    'class': 'form-row'
  }
})
export class FormRowDirective {

}
