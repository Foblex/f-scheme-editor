import { Injectable } from '@angular/core';
import { MouseEventExtensions } from '@foblex/core';
import { ExplorerPanelApiService } from './explorer-panel.api-service';
import { Subject } from 'rxjs';
import { ITreeItem } from '../domain';
import { EEntityType, ROOT_DIRECTORY_KEY } from '@core';

@Injectable()
export class SelectionService {

  public onSelectionChanges$: Subject<void> = new Subject<void>();

  public selected: Map<string, boolean> = new Map<string, boolean>();

  constructor(
      private apiService: ExplorerPanelApiService,
  ) {
  }

  public get firstSelectedOrRoot(): string {
    const ids = Array.from(this.selected.keys());
    return ids.length ? ids[ 0 ] : ROOT_DIRECTORY_KEY;
  }

  public get allSelected(): string[] {
    return Array.from(this.selected.keys());
  }

  public select(event: MouseEvent, viewModel: ITreeItem): void {
    if (MouseEventExtensions.isContextMenuEvent(event)) {
      if (MouseEventExtensions.isCtrlPressed(event)) {
        if (!this.selected.has(viewModel.key)) {
          this.selected.set(viewModel.key, true);
          this.onSelectionChanges$.next();
        }
      } else if (MouseEventExtensions.isShiftPressed(event)) {
        const selected: string[] = Array.from(this.selected.keys());
        if (selected.length) {
          this.selectFromTo(selected[ 0 ], viewModel.key);
        } else {
          this.selectSingle(viewModel.key);
        }
      } else {
        if (!this.selected.has(viewModel.key)) {
          this.selectSingle(viewModel.key);
        }
      }
    } else {
      if (MouseEventExtensions.isCtrlPressed(event)) {
        this.selectMultiple(viewModel.key);
      } else if (MouseEventExtensions.isShiftPressed(event)) {
        const selected: string[] = Array.from(this.selected.keys());
        if (selected.length) {
          this.selectFromTo(selected[ 0 ], viewModel.key);
        } else {
          this.selectSingle(viewModel.key);
        }
      } else {
        this.selectSingle(viewModel.key);
      }
    }
  }

  public selectMultiple(id: string): void {
    if (this.selected.get(id)) {
      this.selected.delete(id);
    } else {
      this.selected.set(id, true);
    }
    this.onSelectionChanges$.next();
  }

  public selectSingle(id: string): void {
    this.selected = new Map<string, boolean>()
    this.selected.set(id, true);
    this.onSelectionChanges$.next();
  }

  public selectFromTo(fromId: string, toId: string): void {
    this.selected = new Map<string, boolean>();
    this.selected.set(fromId, true);
    const items = this.apiService.getEntityIdsBetween(fromId, toId);
    items.forEach((id) => {
      this.selected.set(id, true);
    });
    this.onSelectionChanges$.next();
  }

  public initializeWithIds(ids: string[]): void {
    this.selected = new Map<string, boolean>();
    ids.forEach((id) => {
      this.selected.set(id, true);
    });
    this.onSelectionChanges$.next();
  }

  public getFirstSelectedOrRootDirectory(): string {
    let firstSelectedOrRoot: string = this.firstSelectedOrRoot;
    let item = this.apiService.getItem(firstSelectedOrRoot);

    if (item.type !== EEntityType.DIRECTORY) {
      firstSelectedOrRoot = item.parentKey;
    }
    return firstSelectedOrRoot;
  }

  public getSelectedIfSingleSelected(): ITreeItem | null {
    const allSelected = this.allSelected;
    let result: ITreeItem | null = null;
    if (allSelected.length === 1) {
      result = this.apiService.getItem(allSelected[ 0 ])!;
    }
    return result;
  }
}
