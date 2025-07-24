import { GetEntitiesBetweenInTreeRequest } from './get-entities-between-in-tree.request';
import {IHandler} from "@foblex/mediator";

export class GetEntitiesBetweenInTreeHandler
    implements IHandler<GetEntitiesBetweenInTreeRequest, string[]> {

  public handle(payload: GetEntitiesBetweenInTreeRequest): string[] {

    const items = Array.from(payload.flatten.keys());
    const index1 = items.findIndex((id) => id === payload.from);
    const index2 = items.findIndex((id) => id === payload.to);
    const min = Math.min(index1, index2);
    const max = Math.max(index1, index2);

    return items.filter((id, index) => {
      return index >= min && index <= max
    });
  }
}
