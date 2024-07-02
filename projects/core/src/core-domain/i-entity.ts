import { IEntitySummary } from './i-entity-summary';

export interface IEntity extends IEntitySummary {

  parentKey: string;
}
