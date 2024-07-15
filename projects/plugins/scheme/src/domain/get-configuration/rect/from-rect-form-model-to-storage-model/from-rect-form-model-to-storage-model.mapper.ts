import { IHandler } from '@foblex/core';
import { FromRectFormModelToStorageModelRequest } from './from-rect-form-model-to-storage-model.request';
import { IRectStyle } from '../../../../components/configuration';

export class FromRectFormModelToStorageModelMapper implements IHandler<FromRectFormModelToStorageModelRequest, IRectStyle> {

  public handle(request: FromRectFormModelToStorageModelRequest): IRectStyle {
    const rect = request.modified;
    let positionAndSize = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    if(request.original) {
      positionAndSize = { x: request.original.x, y: request.original.y, width: request.original.width, height: request.original.height };
    }

    return {
      ...positionAndSize,
      background: rect.fill,
      border: {
        isBorder: rect.border.isBorder,
        color: rect.border.color,
        width: rect.border.width,
        style: rect.border.style
      },
      borderRadius: {
        topLeft: rect.borderRadius.value1,
        topRight: rect.borderRadius.value2,
        bottomLeft: rect.borderRadius.value3,
        bottomRight: rect.borderRadius.value4
      },
      padding: {
        top: rect.padding.value1,
        right: rect.padding.value2,
        bottom: rect.padding.value3,
        left: rect.padding.value4
      },
      isClipContent: rect.isClipContent
    }
  }
}
