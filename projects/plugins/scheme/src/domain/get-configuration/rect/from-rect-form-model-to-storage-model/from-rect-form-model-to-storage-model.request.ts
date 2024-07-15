import { IRectFormModel } from './i-rect-form-model';
import { IRectStyle } from '../../../../components/configuration';

export class FromRectFormModelToStorageModelRequest {

  constructor(
    public modified: IRectFormModel,
    public original?: IRectStyle
  ) {
  }
}
