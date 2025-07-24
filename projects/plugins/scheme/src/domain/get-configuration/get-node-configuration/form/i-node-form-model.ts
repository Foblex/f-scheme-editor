import { IFImage } from '@ui-kit';
import { IRectFormModel } from '../../rect';
import {IPoint, ISize} from "@foblex/2d";

export interface INodeFormModel extends IPoint, ISize {

  image: IFImage;

  rect: IRectFormModel;
}
