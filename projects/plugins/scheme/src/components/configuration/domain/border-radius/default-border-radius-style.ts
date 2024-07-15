import { IBorderRadiusStyle } from './i-border-radius-style';

export function defaultBorderRadiusStyle(radius: number): IBorderRadiusStyle {
  return {
    topLeft: radius,
    topRight: radius,
    bottomRight: radius,
    bottomLeft: radius,
  }
}
