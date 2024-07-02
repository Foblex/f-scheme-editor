export function textInterpolation(value: string, args: any[]): string {
  let result: string = '';
  if (value) {
    result = value;
    args.forEach((arg, index) => {
      let argString = (arg === undefined || arg === null) ? '' : `${ arg }`;
      result = result.replace(`\${${ index }}`, argString);
    });
  }
  return result;
}
