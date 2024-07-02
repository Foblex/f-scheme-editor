import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreatePaletteHandler, IPalette, IsValidPaletteHandler } from './domain';
import { IsValidPaletteRequest } from './domain';
import { LOCALIZATION } from './localization';
import { CreateEntityRequestBase, EEntityType, IEntityLocalizationModel, IEntityPlugin, IEntitySummary } from '@core';
import { ICONS } from '@resources';
import { PaletteRootComponent } from './components';

@Injectable({
  providedIn: 'root'
})
export class PalettePlugin implements IEntityPlugin<IPalette> {

  constructor(
      private createHandler: CreatePaletteHandler,
      private validateHandler: IsValidPaletteHandler
  ) {
  }

  public get type(): EEntityType {
    return EEntityType.PALETTE;
  }

  public get icon(): string {
    return ICONS.ENTITIES.PALETTE;
  }

  public get color(): string {
    return '#E56D17';
  }

  public get editor(): ComponentType<any> | null {
    return PaletteRootComponent;
  }

  public create(request: CreateEntityRequestBase): Observable<IEntitySummary> {
    return this.createHandler.handle(request);
  }

  public validate(entity: IPalette): boolean {
    return this.validateHandler.handle(new IsValidPaletteRequest(entity));
  }

  public get localization(): IEntityLocalizationModel {
    return LOCALIZATION;
  }
}
