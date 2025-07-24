import { IBorderFormModel } from './i-border-form-model';
import { IMixedValue } from '../../../../components/configuration';
import {IPoint, ISize} from "@foblex/2d";

export interface IRectFormModel extends IPoint, ISize {

  fill: string;

  border: IBorderFormModel;

  borderRadius: IMixedValue;

  padding: IMixedValue;

  isClipContent: boolean;
}
