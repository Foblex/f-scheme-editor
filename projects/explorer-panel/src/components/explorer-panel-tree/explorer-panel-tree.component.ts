import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveDescendantKeyManager, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { SelectionService, ToggleItemsService } from '../../services';
import { DragAndDropDirective, DragHandleDirective, ExplorerPanelItemPaddingDirective } from '../../directives';
import { ExplorerPanelItemComponent } from '../explorer-panel-item/explorer-panel-item.component';
import { ENTER, hasModifierKey, SPACE } from '@angular/cdk/keycodes';
import { ITreeItem } from '../../domain';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgTemplateOutlet } from '@angular/common';
import { EEntityType } from '@core';

@Component({
  selector: 'ep-tree',
  templateUrl: './explorer-panel-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ExplorerPanelItemComponent,
    NgTemplateOutlet,
    DragHandleDirective,
    ExplorerPanelItemPaddingDirective,
    DragAndDropDirective,
    NgScrollbarModule
  ],
  host: {
    'role': 'tree',
    '(keydown)': 'handleKeydown($event)',
  }
})
export class ExplorerPanelTreeComponent implements AfterViewInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  @Input()
  public viewModel: ITreeItem | undefined;

  public get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  @ViewChild(DragAndDropDirective, { static: true })
  public dragAndDrop: DragAndDropDirective | undefined;

  public isFocused: boolean = false;

  @ViewChildren(ExplorerPanelItemComponent)
  public items: QueryList<ExplorerPanelItemComponent> | undefined;

  @ViewChild('softFocus', { static: true })
  public softFocus!: ElementRef<HTMLDivElement>;

  @Output()
  public dropToContainer: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onActivateItem: EventEmitter<ITreeItem> = new EventEmitter<ITreeItem>();

  private keyManager: ActiveDescendantKeyManager<ExplorerPanelItemComponent> | undefined;

  constructor(
    private elementReference: ElementRef<HTMLElement>,
    private focusMonitor: FocusMonitor,
    private ngZone: NgZone,
    public toggleService: ToggleItemsService,
    private selectionService: SelectionService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngAfterViewInit(): void {
    this.keyManager = new ActiveDescendantKeyManager<ExplorerPanelItemComponent>(this.items!)
      .withVerticalOrientation()
      .withAllowedModifierKeys([ 'shiftKey' ]);

    this.subscriptions$.add(this.subscribeOnFocusChanges());
    if (this.viewModel) {
      this.toggleService.expand(this.viewModel.key);
      this.items?.first.markForCheck();
      this.changeDetectorRef.detectChanges();
    }
  }

  private subscribeOnFocusChanges(): Subscription {
    return this.focusMonitor.monitor(this.hostElement, true).subscribe((origin: FocusOrigin) => {
      this.ngZone.run(() => {
        this.isFocused = !!origin;
        this.changeDetectorRef.markForCheck();
      });
    });
  }

  public toggle(item: ITreeItem): void {
    if (item.children) {
      this.toggleService.toggle(item.key);
    }
  }

  public select(event: MouseEvent, item: ITreeItem): void {
    this.selectionService.select(event, item);
    this.changeDetectorRef.markForCheck();
  }

  public onClick(event: MouseEvent, item: ITreeItem): void {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('expand-collapse-button-content')) {
      this.toggle(item);
    } else {
      this.select(event, item);
    }

    if (item.type !== EEntityType.DIRECTORY) {
      this.onActivateItem.emit(item);
    }
  }

  public onDoubleClick(event: MouseEvent, item: ITreeItem): void {
    if (item.type === EEntityType.DIRECTORY) {
      this.toggle(item);
    }
    event.stopPropagation();
  }

  public onContextMenu(event: MouseEvent, item: ITreeItem): void {
    this.select(event, item);
  }

  public handleKeydown(event: KeyboardEvent): void {
    const manager = this.keyManager!;
    const keyCode = event.keyCode;
    const isTyping = manager.isTyping();

    if (!isTyping && (keyCode === ENTER || keyCode === SPACE) && manager.activeItem && !hasModifierKey(event)) {
      event.preventDefault();
      const item = manager.activeItem.viewModel!;
      if (item.type !== EEntityType.DIRECTORY) {
        this.onActivateItem.emit(item);
      } else {
        this.toggle(item);
        manager.activeItem.markForCheck();
      }
    } else {
      manager.onKeydown(event);
    }
  }

  public expand(key: string): void {
    this.toggleService.expand(key);
    const component = this.items?.find((x) => {
      return x.viewModel?.key! === key;
    });
    component?.markForCheck();
    this.changeDetectorRef.markForCheck();
  }

  public initializeWithIds(ids: string[]): void {
    this.selectionService.initializeWithIds(ids);
  }

  public redrawItem(key: string): void {
    const item = this.items?.find((x) => {
      return x.hostElement.id === key;
    });
    if (item) {
      item.markForCheck();
    }
  }

  public onDragAndDropChanged(): void {
    this.changeDetectorRef.detectChanges();
  }

  public focus(options?: FocusOptions): void {
    this.softFocus.nativeElement.focus(options);
  }

  public onDropToContainer(key: string): void {
    this.dropToContainer.emit(key);
  }

  public ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.hostElement);
    this.subscriptions$.unsubscribe();
  }
}
