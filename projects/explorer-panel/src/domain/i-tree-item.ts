import { EEntityType } from '@core';

export interface ITreeItem {

  key: string;

  parentKey: string;

  name: string;

  type: EEntityType;

  children?: ITreeItem[];
}
