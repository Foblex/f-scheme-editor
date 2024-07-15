import { EFImageMode } from './e-f-image-mode';

export interface IFImage {

  src: string;

  mode: EFImageMode;

  rotate: number;

  exposure: number;

  contrast: number;

  saturation: number;

  temperature: number;

  tint: number;

  highlights: number;

  opacity: number;
}



