import { IPaddingStyle } from './i-padding-style';

export function defaultPaddingStyle(radius: number): IPaddingStyle {
  return {
    left: radius,
    top: radius,
    right: radius,
    bottom: radius,
  }
}
