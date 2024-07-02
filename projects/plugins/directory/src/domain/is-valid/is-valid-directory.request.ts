import { IDirectory } from '../i-directory';
import { IsValidEntityRequestBase } from '@core';

export class IsValidDirectoryRequest implements IsValidEntityRequestBase<IDirectory> {

  constructor(
      public entity: IDirectory
  ) {
  }
}
