import * as _ from "lodash";
import { textInterpolation } from './text-interpolation';

export class LodashExtensions {

  public static textInterpolation(value: string, ...args: any[]): string {
    return textInterpolation(value, args);
  }

  public static cloneDeep<T>(value: T): T {
    return window.structuredClone(value);
  }

  public static findIndex<T, K extends keyof T>(array: T[], iteratee: (x: T) => any): number {
    return _.findIndex(array, iteratee);
  }

  public static removeFromArray<T, K extends keyof T>(array: T[], iteratee: (x: T) => any): void {
    _.remove(array, iteratee);
  }

  public static unique<T, K extends keyof T>(array: T[]): T[] {
    return _.uniq(array);
  }

  public static uniqueBy<T, K extends keyof T>(array: T[], iteratee: (x: T) => any): T[] {
    return _.uniqBy(array, iteratee);
  }

  public static isEquals<T, K extends keyof T>(value1: T, value2: T): boolean {
    return _.isEqual(value1, value2);
  }

  public static includes<T>(array: T[], value: T): boolean {
    return _.includes(array, value);
  }

  public static integerInRange(value: any, range: number, def: number): number {
    let result = Number(value);
    if (!Number.isInteger(result) || result < 0 || result > range || value === null || value === undefined) {
      result = def;
    }
    return result;
  }
}
