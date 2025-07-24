import { FromTextFormModelToStorageModelRequest } from './from-text-form-model-to-storage-model.request';
import { ITextStyle } from '../../../../components/configuration';
import { FromRectFormModelToStorageModelMapper, FromRectFormModelToStorageModelRequest } from '../../rect';
import {IHandler} from "@foblex/mediator";

export class FromTextFormModelToStorageModelMapper implements IHandler<FromTextFormModelToStorageModelRequest, ITextStyle> {

  public handle(request: FromTextFormModelToStorageModelRequest): ITextStyle {
    const rect = request.modified;
    return {
      text: rect.text,
      color: rect.color,
      size: rect.size,
      rect: new FromRectFormModelToStorageModelMapper().handle(
        new FromRectFormModelToStorageModelRequest(rect.rect)
      )
    }
  }
}
