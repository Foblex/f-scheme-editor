import { GetAllChildrenForEntityToPasteRequest } from './get-all-children-for-entity-to-paste.request';
import { IEntity } from '@core';
import {generateGuid} from "@foblex/utils";
import {IHandler} from "@foblex/mediator";

export class GetAllChildrenForEntityToPasteHandler
    implements IHandler<GetAllChildrenForEntityToPasteRequest, IEntity[]> {

  public handle(payload: GetAllChildrenForEntityToPasteRequest): IEntity[] {
    return this.findAllChildren(payload.entity, payload.allEntities);
  }

  private findAllChildren(entity: IEntity, allEntities: IEntity[]): IEntity[] {
    const oldKey = entity.key;

    entity.key = generateGuid();

    const children = allEntities.filter((x) => {
      return x.parentKey === oldKey;
    });
    let result: IEntity[] = [ ...children ];
    children.forEach((x) => {
      x.parentKey = entity.key;
      result = [ ...result, ...this.findAllChildren(x, allEntities) ];
    });
    return result;
  }

}
