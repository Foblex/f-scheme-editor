import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateSchemeHandler, IScheme, IsValidSchemeHandler } from './domain';
import { IsValidSchemeRequest } from './domain';
import { LOCALIZATION } from './localization';
import { CreateEntityRequestBase, EEntityType, IEntityLocalizationModel, IEntityPlugin, IEntitySummary } from '@core';
import { ICONS } from '@resources';
import { SchemeRootComponent } from './components';

@Injectable({
  providedIn: 'root'
})
export class SchemePlugin implements IEntityPlugin<IScheme> {

  constructor(
      private createHandler: CreateSchemeHandler,
      private validateHandler: IsValidSchemeHandler
  ) {
  }

  public get type(): EEntityType {
    return EEntityType.SCHEME_DRAWER;
  }

  public get icon(): string {
    return ICONS.ENTITIES.SCHEME_DRAWER;
  }

  public get color(): string {
    return '#3369d6';
  }

  public get editor(): ComponentType<any> | null {
    return SchemeRootComponent;
  }

  public create(request: CreateEntityRequestBase): Observable<IEntitySummary> {
    return this.createHandler.handle(request);
  }

  public validate(entity: IScheme): boolean {
    return this.validateHandler.handle(new IsValidSchemeRequest(entity));
  }

  public get localization(): IEntityLocalizationModel {
    return LOCALIZATION;
  }
}
