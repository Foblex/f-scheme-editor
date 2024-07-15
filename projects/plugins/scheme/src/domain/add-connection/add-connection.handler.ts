import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IScheme } from '../i-scheme';
import { AddConnectionRequest } from './add-connection.request';
import { EEntityType, IEntitySummary, StorageService } from '@core';
import { GuidExtensions, IHandler } from '@foblex/core';
import { ISchemeConnection } from '../i-scheme-connection';
import { EFConnectableSide, EFConnectionBehavior, EFConnectionType } from '@foblex/flow';
import { defaultConnectionStyle, defaultTextStyle, EConnectionMarker } from '../../components/configuration';

@Injectable()
export class AddConnectionHandler implements IHandler<AddConnectionRequest, Observable<IEntitySummary>> {

  constructor(
    private storage: StorageService,
  ) {
  }

  public handle(payload: AddConnectionRequest): Observable<IEntitySummary> {
    const entity = this.storage.getEntity<IScheme>(payload.key, EEntityType.SCHEME_DRAWER)!;

    entity.connections.push(this.createConnectionModel(payload));

    return this.storage.saveData().pipe(switchMap(() => {
      return of({ key: entity.key, name: entity.name, type: entity.type });
    }));
  }

  private createConnectionModel(request: AddConnectionRequest): ISchemeConnection {
    return {
      key: GuidExtensions.generate(),
      behaviour: EFConnectionBehavior.FLOATING,
      type: EFConnectionType.STRAIGHT,
      connectionSideStart: EFConnectableSide.AUTO,
      connectionSideEnd: EFConnectableSide.AUTO,
      markerStart: EConnectionMarker.CIRCLE,
      markerEnd: EConnectionMarker.ARROW,
      from: request.sourceKey,
      to: request.targetKey,
      radius: 8,
      offset: 32,
      style: defaultConnectionStyle(),
      text: defaultTextStyle(),
    }
  }
}
