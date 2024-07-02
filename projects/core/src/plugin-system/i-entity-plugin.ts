import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { CreateEntityRequestBase } from './create';
import { IEntityLocalizationModel } from './i-entity-localization-model';
import { EEntityType, IEntity, IEntitySummary } from '@core';

export interface IEntityPlugin<TEntity extends IEntity> {

  type: EEntityType;

  icon: string;

  color: string;

  create(payload: CreateEntityRequestBase): Observable<IEntitySummary>;

  validate(entity: TEntity): boolean;

  localization: IEntityLocalizationModel;

  editor: ComponentType<any> | null
}
