import { GetEntitiesWithChildrenRequest } from './get-entities-with-children.request';
import { ITreeItem } from '../i-tree-item';
import { LodashExtensions } from '@core';
import {IHandler} from "@foblex/mediator";

export class GetEntitiesWithChildrenHandler
    implements IHandler<GetEntitiesWithChildrenRequest, ITreeItem[]> {

  public handle(payload: GetEntitiesWithChildrenRequest): ITreeItem[] {

    let allIds: string[] = this.getIdsWithSubIds(payload.allSelected || [], payload.flatten);
    allIds = LodashExtensions.unique(allIds);

    return allIds.map((id) => {
      return payload.flatten.get(id)!;
    });
  }

  private getIdsWithSubIds(ids: string[], flatten: Map<string, ITreeItem>): string[] {
    let result: string[] = [];
    ids.forEach((id) => {
      result.push(id);
      const entity = flatten.get(id);
      const subIds = this.getIdsWithSubIds((entity!.children || []).map((x) => x.key), flatten);
      result = [ ...result, ...subIds ];
    });
    return result;
  }
}
