import { Injectable } from '@angular/core';
import { SessionStateService } from '@core';
import {IMap} from "@foblex/flow";

const SESSION_STATE_KEY: string = 'FS_EP_TI';

@Injectable()
export class ToggleItemsService {

  public expanded: IMap<boolean> = {};

  constructor(
      private sessionState: SessionStateService
  ) {
    this.initialization();
  }

  private initialization(): void {
    this.expanded = this.sessionState.getState(SESSION_STATE_KEY) || {};
  }

  public toggle(id: string): void {
    if (this.expanded[ id ]) {
      delete this.expanded[ id ];
    } else {
      this.expanded[ id ] = true;
    }
    this.update();
  }

  public expand(id: string): void {
    this.expanded[ id ] = true;
    this.update();
  }

  public update(): void {
    this.sessionState.setState(SESSION_STATE_KEY, this.expanded)
  }
}
