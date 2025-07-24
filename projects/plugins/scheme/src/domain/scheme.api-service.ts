import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetSchemeViewModelHandler, GetSchemeViewModelRequest } from './get-view-model';
import { ISchemeViewModel } from './i-scheme-view-model';
import { AddNodeHandler, AddNodeRequest } from './add-node';
import { IEntitySummary } from '@core';
import { AddConnectionHandler, AddConnectionRequest } from './add-connection';
import { TransformNodeHandler } from './transform-node';
import { ReassignConnectionHandler, ReassignConnectionRequest } from './reassign-connection';
import { TransformCanvasHandler } from './transform-canvas';
import { FCanvasChangeEvent, FSelectionChangeEvent } from '@foblex/flow';
import {
  GetConfigurationHandler,
  GetConfigurationRequest
} from './get-configuration';
import { IConfiguration } from '../components/configuration/configuration-root';
import {IPoint, IRect} from "@foblex/2d";

@Injectable()
export class SchemeApiService {

  constructor(
      private getSchemeHandler: GetSchemeViewModelHandler,
      private addNodeToSchemeHandler: AddNodeHandler,
      private createConnectionHandler: AddConnectionHandler,
      private reassignConnectionHandler: ReassignConnectionHandler,
      private transformNodeHandler: TransformNodeHandler,
      private transformCanvasHandler: TransformCanvasHandler,
      private getConfigurationHandler: GetConfigurationHandler
  ) {
  }

  public getScheme(key: string): Observable<ISchemeViewModel> {
    return this.getSchemeHandler.handle(new GetSchemeViewModelRequest(key))
  }

  public addNodeToScheme(key: string, paletteKey: string, position: IPoint): Observable<IEntitySummary> {
    return this.addNodeToSchemeHandler.handle(
      new AddNodeRequest(key, paletteKey, position)
    );
  }

  public createConnection(key: string, sourceKey: string, targetKey: string): Observable<IEntitySummary> {
    return this.createConnectionHandler.handle(
      new AddConnectionRequest(key, sourceKey, targetKey)
    );
  }

  public reassignConnection(key: string, connectionKey: string, targetKey: string): Observable<IEntitySummary> {
    return this.reassignConnectionHandler.handle(
      new ReassignConnectionRequest(key, connectionKey, targetKey)
    );
  }

  public transformNode(key: string, nodeKey: string, rect: IRect): Observable<IEntitySummary> {
    return this.transformNodeHandler.handle({ key, nodeKey, rect });
  }

  public transformCanvas(key: string, event: FCanvasChangeEvent): Observable<void> {
    return this.transformCanvasHandler.handle({ key, ...event });
  }

  public getConfiguration(key: string, selection: FSelectionChangeEvent): Observable<IConfiguration> {
    return this.getConfigurationHandler.handle(
      new GetConfigurationRequest(key, selection.fNodeIds, selection.fConnectionIds)
    );
  }
}
