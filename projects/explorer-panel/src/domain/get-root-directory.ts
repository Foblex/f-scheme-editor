import { ITreeItem } from './i-tree-item';
import { EEntityType, ROOT_DIRECTORY_KEY } from '@core';
import { ICONS } from '@resources';

export function getRootDirectory(name: string): ITreeItem {
  return {
    key: ROOT_DIRECTORY_KEY,
    name: name,
    parentKey: ROOT_DIRECTORY_KEY,
    type: EEntityType.DIRECTORY,
    children: []
  }
}
