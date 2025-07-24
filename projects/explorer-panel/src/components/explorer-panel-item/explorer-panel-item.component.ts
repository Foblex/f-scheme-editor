import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input
} from '@angular/core';
import {
  CuttedItemsService,
  SelectionService,
  ToggleItemsService
} from '../../services';
import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { ITreeItem } from '../../domain';
import { MatIconModule } from '@angular/material/icon';
import { EEntityType } from '@core';
import { ICONS } from '@resources';
import { EntityColorPipe, EntityIconPipe } from '@ui-kit';
import {MouseEventExtensions} from "@foblex/utils";

@Component({
  selector: 'button[ep-item]',
  templateUrl: './explorer-panel-item.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    EntityColorPipe,
    EntityIconPipe
  ],
  host: {
    '[attr.id]': 'viewModel.key',
    'class': 'explorer-panel-item',
    '[class.explorer-panel-item-selected]': 'isSelected',
    '[class.explorer-panel-item-expandable]': 'isExpandable',
    '[class.explorer-panel-item-expanded]': 'isExpanded',
    '[class.explorer-panel-item-cut]': 'isCutStyle',
    'role': 'tree-item',
    '[attr.tabindex]': 'tabIndex'
  }
})
export class ExplorerPanelItemComponent implements FocusableOption {

  public icons = ICONS;

  @Input({ required: true })
  public viewModel!: ITreeItem;

  @Input()
  public disabled: boolean = false;

  public get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  public get isExpandable(): boolean {
    return this.viewModel?.type === EEntityType.DIRECTORY;
  }

  public get isExpanded(): boolean {
    return this.toggleService.expanded[ this.viewModel.key ];
  }

  public get isSelected(): boolean {
    return !!this.selectionService.selected.get(this.viewModel.key);
  }

  public get isCutStyle(): boolean {
    return this.cutService.cutted[ this.viewModel.key ];
  }

  public get tabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  constructor(
      private elementReference: ElementRef<HTMLElement>,
      private changeDetectorRef: ChangeDetectorRef,
      private toggleService: ToggleItemsService,
      private selectionService: SelectionService,
      private cutService: CuttedItemsService,
  ) {
  }

  public focus(_origin?: FocusOrigin, options?: FocusOptions): void {
    if (typeof this.hostElement.focus === 'function') {
      this.hostElement.focus(options);
    }
  }

  public setActiveStyles(): void {
    this.selectionService.select(MouseEventExtensions.fakeEvent(), this.viewModel!);
    this.changeDetectorRef.markForCheck();
  }

  public setInactiveStyles(): void {
  }

  public getLabel(): string {
    return this.viewModel?.name || '';
  }

  public markForCheck(): void {
    this.changeDetectorRef.markForCheck();
  }
}
