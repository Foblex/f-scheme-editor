import { IHandler } from '@foblex/core';
import { Injectable } from '@angular/core';
import { GetSchemeViewModelRequest } from './get-scheme-view-model.request';
import { Observable } from 'rxjs';
import { ToSchemeViewModelMapper } from './to-view-model';
import { ToSchemeViewModelRequest } from './to-view-model';
import { EEntityType, SessionStateService, StorageService } from '@core';
import { ISchemeViewModel } from '../i-scheme-view-model';
import { IScheme } from '../i-scheme';
import { ISchemeEditorVisualState } from '../i-scheme-editor-visual-state';

@Injectable()
export class GetSchemeViewModelHandler
  implements IHandler<GetSchemeViewModelRequest, Observable<ISchemeViewModel | null>> {

  constructor(
    private storage: StorageService,
    private sessionState: SessionStateService
  ) {
  }

  public handle(payload: GetSchemeViewModelRequest): Observable<ISchemeViewModel> {
    const entity = this.storage.getEntity<IScheme>(payload.key, EEntityType.SCHEME_DRAWER)!;

    const visualState = this.sessionState.getState<ISchemeEditorVisualState>(entity.key);
    return new Observable<ISchemeViewModel>((observer) => {
      observer.next(
        new ToSchemeViewModelMapper().handle(
          new ToSchemeViewModelRequest(entity, visualState)
        )
      );
    });
  }
}
