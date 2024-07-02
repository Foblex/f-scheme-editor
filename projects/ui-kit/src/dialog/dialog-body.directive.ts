import { Directive } from '@angular/core';

@Directive({
  selector: 'div[dialogBody]',
  standalone: true,
  host: {
    'class': 'dialog-body'
  }
})
export class DialogBodyDirective {

}
