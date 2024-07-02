import { IHSBAColor } from './i-hsba-color';
import { IParsedColor } from '../i-parsed-color';

export function RGBAToHSBAConverter(rgba: IParsedColor): IHSBAColor {
  const rNorm = normalizeRGB(rgba.values[0]);
  const gNorm = normalizeRGB(rgba.values[1]);
  const bNorm = normalizeRGB(rgba.values[2]);

  const max = calculateMax(rNorm, gNorm, bNorm);
  const min = calculateMin(rNorm, gNorm, bNorm);
  const delta = calculateDelta(max, min);

  const h = calculateHue(rNorm, gNorm, bNorm, max, delta);
  const s = calculateSaturation(max, delta);
  const bFinal = calculateBrightness(max);

  return { h, s, b: bFinal, a: rgba.alpha };
}

function normalizeRGB(value: number): number {
  return value / 255;
}

function calculateMax(rNorm: number, gNorm: number, bNorm: number): number {
  return Math.max(rNorm, gNorm, bNorm);
}

function calculateMin(rNorm: number, gNorm: number, bNorm: number): number {
  return Math.min(rNorm, gNorm, bNorm);
}

function calculateDelta(max: number, min: number): number {
  return max - min;
}

function calculateHue(rNorm: number, gNorm: number, bNorm: number, max: number, delta: number): number {
  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) {
      h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
    h /= 6;
    h *= 360;
  }
  return h;
}

function calculateSaturation(max: number, delta: number): number {
  return max !== 0 ? (delta / max) * 100 : 0;
}

function calculateBrightness(max: number): number {
  return max * 100;
}


