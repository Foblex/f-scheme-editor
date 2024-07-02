import { EKeyboardEvent } from './e-keyboard-event';
import { EOperationSystem } from '@foblex/core';

export const SHORTCUTS = {
  [ EKeyboardEvent.NEW ]: {
    [ EOperationSystem.MAC_OS ]: '⇧⌘S',
    [ EOperationSystem.WINDOWS ]: 'SHIFT + CTRL + S',
  },
  [ EKeyboardEvent.RENAME ]: {
    [ EOperationSystem.MAC_OS ]: '⌘R',
    [ EOperationSystem.WINDOWS ]: 'CTRL + R',
  },
  [ EKeyboardEvent.REMOVE ]: {
    [ EOperationSystem.MAC_OS ]: 'DEL',
    [ EOperationSystem.WINDOWS ]: 'DEL',
  },
  [ EKeyboardEvent.ZOOM_IN ]: {
    [ EOperationSystem.MAC_OS ]: '⌘-',
    [ EOperationSystem.WINDOWS ]: 'CTRL -',
  },
  [ EKeyboardEvent.ZOOM_OUT ]: {
    [ EOperationSystem.MAC_OS ]: '⌘+',
    [ EOperationSystem.WINDOWS ]: 'CTRL +',
  },
  [ EKeyboardEvent.COPY ]: {
    [ EOperationSystem.MAC_OS ]: '⌘C',
    [ EOperationSystem.WINDOWS ]: 'CTRL + C',
  },
  [ EKeyboardEvent.CUT ]: {
    [ EOperationSystem.MAC_OS ]: '⌘X',
    [ EOperationSystem.WINDOWS ]: 'CTRL + X',
  },
  [ EKeyboardEvent.PASTE ]: {
    [ EOperationSystem.MAC_OS ]: '⌘V',
    [ EOperationSystem.WINDOWS ]: 'CTRL + V',
  },
  [ EKeyboardEvent.UNDO ]: {
    [ EOperationSystem.MAC_OS ]: '⌘Z',
    [ EOperationSystem.WINDOWS ]: 'CTRL + Z',
  },
  [ EKeyboardEvent.CLOSE ]: {
    [ EOperationSystem.MAC_OS ]: '⌘W',
    [ EOperationSystem.WINDOWS ]: 'CTRL + W',
  }
}
