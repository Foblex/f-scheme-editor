import { IHandler } from '@foblex/core';
import { Observable } from 'rxjs';
import { CreateEntityRequestBase } from './create-entity-request-base';
import { IEntitySummary } from '../../core-domain';

export abstract class CreateEntityHandlerBase
    implements IHandler<CreateEntityRequestBase, Observable<IEntitySummary>> {

  public abstract handle(payload: CreateEntityRequestBase): Observable<IEntitySummary>;
}
