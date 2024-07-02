import { IIdName, IMap } from '@foblex/core';
import { IEntity } from '../core-domain';

export interface IState extends IIdName<string> {

  createdAt: number;

  updatedAt: number;

  tree: IMap<string>;

  entities: IMap<IMap<IEntity>>;
}
