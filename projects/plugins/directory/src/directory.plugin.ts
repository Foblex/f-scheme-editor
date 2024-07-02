import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateDirectoryHandler, IDirectory, IsValidDirectoryHandler } from './domain';
import { IsValidDirectoryRequest } from './domain';
import { LOCALIZATION } from './localization';
import { CreateEntityRequestBase, EEntityType, IEntityLocalizationModel, IEntityPlugin, IEntitySummary } from '@core';
import { ICONS } from '@resources';

@Injectable({
  providedIn: 'root'
})
export class DirectoryPlugin implements IEntityPlugin<IDirectory> {

  constructor(
    private createHandler: CreateDirectoryHandler,
    private validator: IsValidDirectoryHandler
  ) {
  }

  public get type(): EEntityType {
    return EEntityType.DIRECTORY;
  }

  public get icon(): string {
    return ICONS.ENTITIES.DIRECTORY;
  }

  public get color(): string {
    return '#6c707e';
  }

  public get editor(): ComponentType<any> | null {
    return null;
  }

  public create(request: CreateEntityRequestBase): Observable<IEntitySummary> {
    return this.createHandler.handle(request);
  }

  public validate(entity: IDirectory): boolean {
    return this.validator.handle(new IsValidDirectoryRequest(entity));
  }

  public get localization(): IEntityLocalizationModel {
    return LOCALIZATION;
  }
}
