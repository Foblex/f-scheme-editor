import { IEntity } from '../../core-domain';

export interface IsValidEntityRequestBase<T extends IEntity> {

  entity: T;
}
