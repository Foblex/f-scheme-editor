import { IPaletteItem } from './i-palette-item';

export interface IPaletteGroup {

  key: string;

  name: string;

  items: IPaletteItem[];
}
