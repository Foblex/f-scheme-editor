import { INodeConnectorViewModel } from './i-node-connector-view-model';
import { ISchemeNode } from './i-scheme-node';

export interface ISchemeNodeViewModel extends ISchemeNode {

  inputs: INodeConnectorViewModel[];

  outputs: INodeConnectorViewModel[];
}
