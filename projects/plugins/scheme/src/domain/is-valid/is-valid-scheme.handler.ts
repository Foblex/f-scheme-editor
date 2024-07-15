import { Injectable } from '@angular/core';
import { IScheme } from '../i-scheme';
import { IsValidSchemeRequest } from './is-valid-scheme.request';
import { IsValidEntityHandlerBase } from '@core';

@Injectable({
  providedIn: 'root'
})
export class IsValidSchemeHandler extends IsValidEntityHandlerBase<IScheme> {

  constructor() {
    super();
  }

  public override handle(request: IsValidSchemeRequest): boolean {
    //TODO: Implement validation logic
    return true;
  }
}
