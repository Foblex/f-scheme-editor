import { Injectable } from '@angular/core';
import { IPalette } from '../i-palette';
import { IsValidPaletteRequest } from './is-valid-palette.request';
import { IsValidEntityHandlerBase } from '@core';

@Injectable({
  providedIn: 'root'
})
export class IsValidPaletteHandler extends IsValidEntityHandlerBase<IPalette> {

  constructor() {
    super();
  }

  public override handle(request: IsValidPaletteRequest): boolean {
    //TODO: Implement validation logic
    return true;
  }
}
