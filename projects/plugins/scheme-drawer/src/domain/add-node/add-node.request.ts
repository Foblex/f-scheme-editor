import { IPoint } from '@foblex/core';

export class AddNodeRequest {

  constructor(
    public readonly key: string,
    public readonly paletteKey: string,
    public readonly position: IPoint,
  ) {

  }
}
