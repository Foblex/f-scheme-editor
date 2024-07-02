import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IScheme } from '../i-scheme';
import { AddNodeRequest } from './add-node.request';
import { EEntityType, IEntitySummary, StorageService } from '@core';
import { GuidExtensions, IHandler } from '@foblex/core';
import { ISchemeNode } from '../i-scheme-node';
import { defaultRectStyle, defaultTextStyle } from '../../components/configuration';

@Injectable()
export class AddNodeHandler implements IHandler<AddNodeRequest, Observable<IEntitySummary>> {

  constructor(
    private storage: StorageService,
  ) {
  }

  public handle(payload: AddNodeRequest): Observable<IEntitySummary> {
    const entity = this.storage.getEntity<IScheme>(payload.key, EEntityType.SCHEME_DRAWER)!;

    entity.nodes.push(this.createNodeModel(payload));

    return this.storage.saveData().pipe(switchMap(() => {
      return of({ key: entity.key, name: entity.name, type: entity.type });
    }));
  }

  private createNodeModel(request: AddNodeRequest): ISchemeNode {
    return {
      key: GuidExtensions.generate(),
      type: request.paletteKey,
      textStyle: defaultTextStyle(),
      rectStyle: defaultRectStyle(request.position, { width: 100, height: 100 }),
    }
  }
}
