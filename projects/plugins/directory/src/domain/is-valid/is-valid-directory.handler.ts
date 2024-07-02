import { Injectable } from '@angular/core';
import { IDirectory } from '../i-directory';
import { IsValidDirectoryRequest } from './is-valid-directory.request';
import { IsValidEntityHandlerBase } from '@core';

@Injectable({
  providedIn: 'root'
})
export class IsValidDirectoryHandler extends IsValidEntityHandlerBase<IDirectory> {

  constructor() {
    super();
  }

  public override handle(request: IsValidDirectoryRequest): boolean {
    //TODO: Implement validation logic
    return true;
  }
}
