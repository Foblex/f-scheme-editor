import { LodashExtensions } from '@core';

export function validateIntegerValues<T extends Object>(current: T, original: T, range: number): T {
  (Object.keys(current) as (keyof T)[]).map((key) => {
    current[ key ] = LodashExtensions.integerInRange(current[ key ], range, original[ key ] as number) as any;
  });
  return current;
}
