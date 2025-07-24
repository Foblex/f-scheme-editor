import { IPoint } from "@foblex/2d";

export class AddNodeRequest {

  constructor(
    public readonly key: string,
    public readonly paletteKey: string,
    public readonly position: IPoint,
  ) {

  }
}
