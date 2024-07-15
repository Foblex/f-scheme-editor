import { ITextFormModel } from './i-text-form-model';

export class FromTextFormModelToStorageModelRequest {

  constructor(
    public modified: ITextFormModel
  ) {
  }
}
