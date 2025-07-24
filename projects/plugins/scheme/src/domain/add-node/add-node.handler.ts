import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IScheme } from '../i-scheme';
import { AddNodeRequest } from './add-node.request';
import { EEntityType, IEntitySummary, StorageService } from '@core';
import { ISchemeNode } from '../i-scheme-node';
import { defaultRectStyle, defaultTextStyle } from '../../components/configuration';
import { defaultFImage } from '@ui-kit';
import {IHandler} from "@foblex/mediator";
import {generateGuid} from "@foblex/utils";

@Injectable()
export class AddNodeHandler implements IHandler<AddNodeRequest, Observable<IEntitySummary>> {

  constructor(
    private storage: StorageService,
  ) {
  }

  public handle(payload: AddNodeRequest): Observable<IEntitySummary> {
    const entity = this.getEntity(payload.key);
    entity.nodes.push(this.create(payload));

    return this.storage.saveData().pipe(switchMap(() => {
      return of({ key: entity.key, name: entity.name, type: entity.type });
    }));
  }

  private getEntity(key: string): IScheme {
    return this.storage.getEntity<IScheme>(key, EEntityType.SCHEME_DRAWER)!;
  }

  private create(request: AddNodeRequest): ISchemeNode {
    return {
      key: generateGuid(),
      type: request.paletteKey,
      image: defaultFImage(),
      textStyle: defaultTextStyle(),
      rectStyle: defaultRectStyle(request.position, { width: 100, height: 100 }, '#007bff'),
    }
  }
}
