import { IParsedColor } from './i-parsed-color';

const baseHues: { [ key: string ]: number } = {
  red: 0,
  orange: 60,
  yellow: 120,
  green: 180,
  blue: 240,
  purple: 300
};

export class ColorParser {
  public static parse(cstr: string | number): IParsedColor {
    if (typeof cstr === 'number') {
      return this.parseNumber(cstr);
    }

    cstr = String(cstr).toLowerCase();

    if (cstr === 'transparent') {
      return this.parseTransparent();
    } else if (cstr[ 0 ] === '#') {
      return this.parseHex(cstr);
    } else if (this.isColorSpace(cstr)) {
      return this.parseColorSpace(cstr);
    } else if (/[0-9](?:\s|\/|,)/.test(cstr)) {
      return this.parseNamedChannels(cstr);
    }
    return { space: 'rgb', values: [ 0, 0, 0 ], alpha: 1 };
  }

  private static parseNumber(cstr: number): IParsedColor {
    return {
      space: 'rgb',
      values: [ cstr >>> 16, (cstr & 0x00ff00) >>> 8, cstr & 0x0000ff ],
      alpha: 1
    };
  }

  private static parseTransparent(): IParsedColor {
    return {
      space: 'rgb',
      values: [ 0, 0, 0 ],
      alpha: 0
    };
  }

  private static parseHex(cstr: string): IParsedColor {
    const base = cstr.slice(1);
    const size = base.length;
    const isShort = size <= 4;
    let alpha = 1;
    let parts: number[];

    if (isShort) {
      parts = [
        parseInt(base[ 0 ] + base[ 0 ], 16),
        parseInt(base[ 1 ] + base[ 1 ], 16),
        parseInt(base[ 2 ] + base[ 2 ], 16)
      ];
      if (size === 4) {
        alpha = parseInt(base[ 3 ] + base[ 3 ], 16) / 255;
      }
    } else {
      parts = [
        parseInt(base[ 0 ] + base[ 1 ], 16),
        parseInt(base[ 2 ] + base[ 3 ], 16),
        parseInt(base[ 4 ] + base[ 5 ], 16)
      ];
      if (size === 8) {
        alpha = parseInt(base[ 6 ] + base[ 7 ], 16) / 255;
      }
    }

    parts = parts.map(part => part || 0);

    return { space: 'rgb', values: parts, alpha };
  }

  private static isColorSpace(cstr: string): boolean {
    return /^((?:rgba?|hs[lvb]a?|hwba?|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms|oklch|oklab|color))\s*\(([^\)]*)\)/.test(cstr);
  }

  private static parseColorSpace(cstr: string): IParsedColor {
    const m = /^((?:rgba?|hs[lvb]a?|hwba?|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms|oklch|oklab|color))\s*\(([^\)]*)\)/.exec(cstr);
    if (!m) {
      throw new Error('Invalid color space format');
    }
    const name = m[ 1 ];
    let space = name.replace(/a$/, '');
    const dims = space === 'cmyk' ? 4 : space === 'gray' ? 1 : 3;
    let parts = m[ 2 ].trim().split(/\s*[,\/]\s*|\s+/);

    if (space === 'color') space = parts.shift() as string;

    let values = parts.map((x, i) => this.parseComponent(x, i, space));

    const alpha = (values.length > dims) ? values.pop() : 1;

    return { space, values: values, alpha: alpha || 1 };
  }

  private static parseNamedChannels(cstr: string): IParsedColor {
    const parts = (cstr.match(/([0-9]+)/g) || []).map(value => parseFloat(value));
    const space = (cstr.match(/([a-z])/ig) || []).join('').toLowerCase() || 'rgb';

    return { space, values: parts, alpha: 1 };
  }

  private static parseComponent(x: string, i: number, space: string): number {
    if (x.endsWith('%')) {
      const value = parseFloat(x) / 100;
      if (i === 3) return value;
      if (space === 'rgb') return value * 255;
      if (space[ 0 ] === 'h') return value * 100;
      if (space[ 0 ] === 'l' && !i) return value * 100;
      if (space === 'lab') return value * 125;
      if (space === 'lch') return i < 2 ? value * 150 : value * 360;
      if (space[ 0 ] === 'o' && !i) return value;
      if (space === 'oklab') return value * 0.4;
      if (space === 'oklch') return i < 2 ? value * 0.4 : value * 360;
      return value;
    }

    if (space[ i ] === 'h' || (i === 2 && space[ space.length - 1 ] === 'h')) {
      if (baseHues[ x ] !== undefined) return baseHues[ x ];
      if (x.endsWith('deg')) return parseFloat(x);
      if (x.endsWith('turn')) return parseFloat(x) * 360;
      if (x.endsWith('grad')) return parseFloat(x) * 360 / 400;
      if (x.endsWith('rad')) return parseFloat(x) * 180 / Math.PI;
    }

    if (x === 'none') return 0;
    return parseFloat(x);
  }
}
