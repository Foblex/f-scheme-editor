import { IPoint, ISize } from '@foblex/core';
import { IFImage } from '@ui-kit';
import { IRectFormModel } from '../../rect';

export interface INodeFormModel extends IPoint, ISize {

  image: IFImage;

  rect: IRectFormModel;
}
