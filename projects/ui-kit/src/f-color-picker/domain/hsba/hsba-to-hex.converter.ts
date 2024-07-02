import { IHSBAColor, validateHSBA } from './i-hsba-color';

export function HSBAToHexConverter(color: IHSBAColor): string {
  const { h, s, b, a } = validateHSBA(color);
  const hex = HSBAToHex(h, s, b);
  const alpha = Math.round(a * 255);
  const alphaHex = componentToHex(alpha);
  if (alpha !== 255) {
    return `${ hex }${ alphaHex }`;
  }
  return `${ hex }`;
}

function HSBAToHex(h: number, s: number, b: number): string {
  s /= 100;
  b /= 100;

  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));

  const r = Math.round(255 * f(5));
  const g = Math.round(255 * f(3));
  const bFinal = Math.round(255 * f(1));

  return `#${ ((1 << 24) + (r << 16) + (g << 8) + bFinal).toString(16).slice(1).toUpperCase() }`;
}

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
