import { GetAllChildrenForEntityToPasteRequest } from './get-all-children-for-entity-to-paste.request';
import { GuidExtensions, IHandler } from '@foblex/core';
import { IEntity } from '@core';


export class GetAllChildrenForEntityToPasteHandler
    implements IHandler<GetAllChildrenForEntityToPasteRequest, IEntity[]> {

  public handle(payload: GetAllChildrenForEntityToPasteRequest): IEntity[] {
    return this.findAllChildren(payload.entity, payload.allEntities);
  }

  private findAllChildren(entity: IEntity, allEntities: IEntity[]): IEntity[] {
    const oldKey = entity.key;

    entity.key = GuidExtensions.generate();

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
