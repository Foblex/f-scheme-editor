import { Pipe, PipeTransform } from '@angular/core';
import { MouseEventExtensions } from '@foblex/core';
import { EKeyboardEvent, SHORTCUTS } from '@core';

@Pipe({
  name: 'shortcut',
  standalone: true
})
export class ShortcutPipe implements PipeTransform {

  public transform(type: EKeyboardEvent): string {
    // @ts-ignore
    return SHORTCUTS[type][MouseEventExtensions.os];
  }
}
