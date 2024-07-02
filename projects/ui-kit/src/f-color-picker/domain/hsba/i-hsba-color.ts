export interface IHSBAColor {

  h: number;

  s: number;

  b: number;

  a: number;
}

export function validateHSBA(color: IHSBAColor): IHSBAColor {
  return {
    h: Math.min(360, Math.max(0, color.h)),
    s: Math.min(100, Math.max(0, color.s)),
    b: Math.min(100, Math.max(0, color.b)),
    a: Math.min(1, Math.max(0, color.a))
  };
}
