import { IsValidEntityRequestBase } from './is-valid-entity-request-base';
import { IEntity } from '../../core-domain';
import {IHandler} from "@foblex/mediator";

export abstract class IsValidEntityHandlerBase<T extends IEntity> implements IHandler<IsValidEntityRequestBase<T>, boolean> {

  public abstract handle(request: IsValidEntityRequestBase<T>): boolean;
}
