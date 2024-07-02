import { IHandler } from '@foblex/core';
import { Injectable } from '@angular/core';
import { GetConfigurationRequest } from './get-configuration.request';
import { Observable } from 'rxjs';
import { GetSchemeConfigurationHandler } from './get-scheme-configuration/get-scheme-configuration.handler';
import { GetSchemeConfigurationRequest } from './get-scheme-configuration/get-scheme-configuration.request';
import { GetSchemeNodeConfigurationHandler } from './get-node-configuration';
import { GetSchemeNodeConfigurationRequest } from './get-node-configuration';
import {
  GetSchemeConnectionConfigurationHandler,
  GetSchemeConnectionConfigurationRequest
} from './get-connection-configuration';
import { IConfiguration } from '../../components/configuration';

@Injectable()
export class GetConfigurationHandler
  implements IHandler<GetConfigurationRequest, Observable<IConfiguration>> {

  constructor(
    private getConnectionConfigurationHandler: GetSchemeConnectionConfigurationHandler,
    private getSchemesConfigurationHandler: GetSchemeConfigurationHandler,
    private getNodesConfigurationHandler: GetSchemeNodeConfigurationHandler,
  ) {
  }

  public handle(payload: GetConfigurationRequest): Observable<IConfiguration> {
    const nodes = payload.nodes;
    const connections = payload.connections;

    let result = this.getSchemeConfiguration(payload.key);
    if (nodes.length === 1 && connections.length === 0) {
      result = this.getNodesConfiguration(payload.key, nodes[ 0 ]);
    } else if (nodes.length === 0 && connections.length === 1) {
      result = this.getConnectionConfiguration(payload.key, connections[ 0 ]);
    }

    return result;
  }

  private getSchemeConfiguration(key: string): Observable<IConfiguration> {
    return this.getSchemesConfigurationHandler.handle(
      new GetSchemeConfigurationRequest(key)
    );
  }

  private getNodesConfiguration(key: string, nodeKey: string): Observable<IConfiguration> {
    return this.getNodesConfigurationHandler.handle(
      new GetSchemeNodeConfigurationRequest(key, nodeKey)
    );
  }

  private getConnectionConfiguration(key: string, connectionKey: string): Observable<IConfiguration> {
    return this.getConnectionConfigurationHandler.handle(
      new GetSchemeConnectionConfigurationRequest(key, connectionKey)
    );
  }
}
