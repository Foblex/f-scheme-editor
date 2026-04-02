import { Injectable } from '@angular/core';

@Injectable()
export class CuttedItemsService {

  public cutted: Record<string, boolean> = {};

  public clear(): void {
    this.cutted = {}
  }

  public cut(ids: string[]): void {
    ids.forEach((id) => {
      this.cutted[ id ] = true;
    });
  }
}
