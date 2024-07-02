import { IEntity } from '@core';
import { ISchemeConnection } from './i-scheme-connection';
import { ISchemeNode } from './i-scheme-node';
import { ESchemeBackground } from './e-scheme-background';

export interface IScheme extends IEntity {

  background: ESchemeBackground;

  fill: string;

  stroke: string;

  nodes: ISchemeNode[];

  connections: ISchemeConnection[];
}
