import { IScheme } from '../i-scheme';
import { IsValidEntityRequestBase } from '@core';

export class IsValidSchemeRequest implements IsValidEntityRequestBase<IScheme> {

  constructor(
      public entity: IScheme
  ) {
  }
}
