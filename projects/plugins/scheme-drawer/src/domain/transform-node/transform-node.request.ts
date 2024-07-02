import { IRect } from '@foblex/core';

export class TransformNodeRequest {

  constructor(
    public readonly key: string,
    public readonly nodeKey: string,
    public readonly rect: IRect,
  ) {

  }
}
