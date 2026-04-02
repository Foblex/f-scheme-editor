import {IEntity, IIdName} from '../core-domain';

export interface IState extends IIdName<string> {

  createdAt: number;

  updatedAt: number;

  tree: Record<string, string>;

  entities: Record<string,Record<string,IEntity>>;
}
