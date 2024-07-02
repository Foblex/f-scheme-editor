import { Directive } from '@angular/core';

@Directive({
  selector: 'div[formContainer]',
  standalone: true,
  host: {
    'class': 'form-container'
  }
})
export class FormContainerDirective {

}
