import { Pipe, PipeTransform } from '@angular/core';
import { EKeyboardEvent, SHORTCUTS } from '@core';
import {EOperationSystem} from "@foblex/platform";

@Pipe({
  name: 'shortcut',
  standalone: true
})
export class ShortcutPipe implements PipeTransform {

  //TODO: add support for other operation systems
  public transform(type: EKeyboardEvent): string {
    // @ts-ignore
    return SHORTCUTS[type][EOperationSystem.MAC_OS];
  }
}
