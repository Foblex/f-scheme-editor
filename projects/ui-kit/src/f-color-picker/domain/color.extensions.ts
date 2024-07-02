import { IParsedColor } from './i-parsed-color';
import { ColorParser } from './color.parser';
import { IHSBAColor } from './hsba';

export class ColorExtensions {

  public static fromString(color: string): IParsedColor {
    return ColorParser.parse(color);
  }

  public static toRgba(color: IParsedColor): IParsedColor {
    if (!color.space) return { space: 'rgb', values: [ 0, 0, 0 ], alpha: 1 };

    const min = color.space[ 0 ] === 'h' ? [ 0, 0, 0 ] : [ 0, 0, 0 ];
    const max = color.space[ 0 ] === 'h' ? [ 360, 100, 100 ] : [ 255, 255, 255 ];

    let values = Array(3);
    values[ 0 ] = Math.min(Math.max(color.values[ 0 ], min[ 0 ]), max[ 0 ]);
    values[ 1 ] = Math.min(Math.max(color.values[ 1 ], min[ 1 ]), max[ 1 ]);
    values[ 2 ] = Math.min(Math.max(color.values[ 2 ], min[ 2 ]), max[ 2 ]);

    if (color.space[ 0 ] === 'h') {
      values = this.hslToRgb(values);
    }

    return { space: 'rgb', values, alpha: Math.min(Math.max(color.alpha, 0), 1) };
  }

  private static hslToRgb(hsl: number[]): number[] {
    let h = hsl[ 0 ] / 360, s = hsl[ 1 ] / 100, l = hsl[ 2 ] / 100, t1, t2, t3, rgb, val, i = 0;

    if (s === 0) {
      return val = l * 255, [ val, val, val ];
    }

    t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    t1 = 2 * l - t2;

    rgb = [ 0, 0, 0 ];
    for (; i < 3;) {
      t3 = h + 1 / 3 * -(i - 1);
      t3 < 0 ? t3++ : t3 > 1 && t3--;
      val = 6 * t3 < 1 ? t1 + (t2 - t1) * 6 * t3 :
        2 * t3 < 1 ? t2 :
          3 * t3 < 2 ? t1 + (t2 - t1) * (2 / 3 - t3) * 6 :
            t1;
      rgb[ i++ ] = val * 255;
    }

    return rgb;
  }

  public static defaultHSBA(): IHSBAColor {
    return { h: 0, s: 100, b: 100, a: 1 };
  }
}
