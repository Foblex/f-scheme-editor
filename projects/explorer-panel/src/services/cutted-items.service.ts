import { Injectable } from '@angular/core';
import {IMap} from "@foblex/flow";

@Injectable()
export class CuttedItemsService {

  public cutted: IMap<boolean> = {};

  public clear(): void {
    this.cutted = {}
  }

  public cut(ids: string[]): void {
    ids.forEach((id) => {
      this.cutted[ id ] = true;
    });
  }
}
