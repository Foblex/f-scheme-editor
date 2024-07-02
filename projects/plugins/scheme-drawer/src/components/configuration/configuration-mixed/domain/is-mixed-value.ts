export function isMixedValue<T extends Object>(object: T): boolean {
  const values = Object.values(object);
  return values.length > 0 ?
    values.some((x) => x !== values[ 0 ]) : false;
}


