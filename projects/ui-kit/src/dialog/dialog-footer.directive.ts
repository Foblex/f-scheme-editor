import { Directive } from '@angular/core';

@Directive({
  selector: 'div[dialogFooter]',
  standalone: true,
  host: {
    'class': 'dialog-footer'
  }
})
export class DialogFooterDirective {

}
