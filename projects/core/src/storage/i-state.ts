import {IEntity, IIdName} from '../core-domain';
import {IMap} from "@foblex/flow";

export interface IState extends IIdName<string> {

  createdAt: number;

  updatedAt: number;

  tree: IMap<string>;

  entities: IMap<IMap<IEntity>>;
}
