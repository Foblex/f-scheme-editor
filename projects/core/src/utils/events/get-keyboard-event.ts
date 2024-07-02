import {
  A,
  BACKSPACE,
  C,
  DASH,
  DELETE,
  EQUALS,
  F,
  NUMPAD_MINUS,
  NUMPAD_PLUS,
  R,
  S,
  V,
  Z
} from '@angular/cdk/keycodes';
import { EKeyboardEvent } from './e-keyboard-event';
import { MouseEventExtensions } from '@foblex/core';

export function getKeyboardEvent(event: KeyboardEvent): EKeyboardEvent | undefined {
  let result: EKeyboardEvent | undefined;
  switch (event.keyCode) {
    case BACKSPACE:
      result = EKeyboardEvent.REMOVE;
      break;
    case DELETE:
      result = EKeyboardEvent.REMOVE;
      break;
    case NUMPAD_PLUS:
      if (MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.ZOOM_IN;
      }
      break;
    case EQUALS:
      if (MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.ZOOM_IN;
      }
      break;
    case NUMPAD_MINUS:
      if (MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.ZOOM_OUT;
      }
      break;
    case DASH:
      if (MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.ZOOM_OUT;
      }
      break;
    case C:
      if (MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.COPY;
      }
      break;
    case V:
      if (MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.PASTE;
      }
      break;
    case Z:
      if (MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.UNDO;
      }
      break;
    case F:
      if (MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.SEARCH;
      }
      break;
    case A:
      if (MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.SELECT_ALL;
      }
      break;
    case R:
      if (MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.RENAME;
      }
      break;
    case S:
      if (MouseEventExtensions.isCommandButton(event) && !MouseEventExtensions.isShiftPressed(event)) {
        result = EKeyboardEvent.SAVE;
      }
      if (MouseEventExtensions.isShiftPressed(event) && MouseEventExtensions.isCommandButton(event)) {
        result = EKeyboardEvent.NEW;
      }
      break;
  }
  if(document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
    result = undefined;
  }
  return result;
}
