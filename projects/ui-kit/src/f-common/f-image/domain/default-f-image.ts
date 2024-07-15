import { EFImageMode, IFImage } from '@ui-kit';

export function defaultFImage(src: string = ''): IFImage {
  return {
    src: src,
    mode: EFImageMode.FILL,
    rotate: 0,
    exposure: 0,
    contrast: 100,
    saturation: 100,
    temperature: 0,
    tint: 0,
    highlights: 0,
    opacity: 100,
  };
}
