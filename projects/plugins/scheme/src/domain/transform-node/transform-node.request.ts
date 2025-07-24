import {IRect} from "@foblex/2d";

export class TransformNodeRequest {

  constructor(
    public readonly key: string,
    public readonly nodeKey: string,
    public readonly rect: IRect,
  ) {

  }
}
