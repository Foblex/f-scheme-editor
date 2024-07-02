import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injector, Input, NgZone,
  OnDestroy,
  Output,
  QueryList
} from "@angular/core";
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DragHandleDirective } from './drag-handle.directive';
import {
  CreateDragAndDropPlaceholderFeature,
  GetDragHandleUnderPointerFeature,
  ToggleSelectionDragAndDropItemsFeature
} from '../../domain';
import { NgScrollbar } from 'ngx-scrollbar';
import { IDragAndDropBase } from './i-drag-and-drop-base';
import { IHasHostElement, IPointerEvent, Point } from '@foblex/core';
import { EEntityType, ROOT_DIRECTORY_KEY } from '@core';

const DROP_HOVERED_CLASS: string = 'explorer-panel-tree-item-drop-hovered';

@Directive({
  selector: "[epDraggable]",
  standalone: true,
  providers: [
    ToggleSelectionDragAndDropItemsFeature,
    CreateDragAndDropPlaceholderFeature,
    GetDragHandleUnderPointerFeature
  ]
})
export class DragAndDropDirective
  extends IDragAndDropBase implements IHasHostElement,
                                      AfterViewInit,
                                      OnDestroy {

  private dropSubscriptions$: Subscription = Subscription.EMPTY;

  @Input()
  public disabled: boolean = false;

  private onPointerDownPosition: Point | undefined;

  public get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  @ContentChildren(DragHandleDirective, { descendants: false })
  public items: QueryList<DragHandleDirective> | undefined;

  private draggedItem: DragHandleDirective | undefined;

  @Output()
  public onChanges: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public dropToDirectory: EventEmitter<string> = new EventEmitter<string>();

  private itemForDrop: DragHandleDirective | undefined;

  private onHoverItemWithChildren$: Subject<DragHandleDirective | undefined> = new Subject<DragHandleDirective | undefined>();

  private dragPlaceholder: HTMLElement | undefined;

  private isPlaceholderAttached: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private ngScrollBar: NgScrollbar,
    private elementReference: ElementRef<HTMLElement>,
    private injector: Injector,
    ngZone: NgZone,
    private getFolderUnderPointer: GetDragHandleUnderPointerFeature
  ) {
    super(ngZone);
  }

  public ngAfterViewInit(): void {
    super.subscribe(this.document);
  }

  public onPointerDown(event: IPointerEvent): boolean {
    let result: boolean = false;
    if (this.isCanDragStart(event)) {
      const item = (this.items || []).find((x) => x.hostElement.contains(event.targetElement) || x.hostElement === event.targetElement);
      if (item) {
        this.draggedItem = item;

        this.onPointerDownPosition = Point.fromPoint(event.getPosition());
        result = true;
      }
    }

    return result;
  }

  private isCanDragStart(event: IPointerEvent): boolean {
    return event.isMouseLeftButton() && !this.draggedItem && !this.disabled &&
        !this.ngScrollBar.state.horizontalHovered &&
        !this.ngScrollBar.state.verticalHovered;
  }

  private isSkipPointerMove(event: IPointerEvent): boolean {
    const dif = Point.fromPoint(event.getPosition()).sub(this.onPointerDownPosition!);
    return Math.abs(dif.x) < 10 && Math.abs(dif.y) < 10;
  }

  protected prepareDragSequence(event: IPointerEvent): void {
  }

  public onPointerMove(event: IPointerEvent): boolean {
    if (!this.isPlaceholderAttached && !this.isSkipPointerMove(event)) {

      const toggleFeature = this.injector.get(ToggleSelectionDragAndDropItemsFeature);
      if (toggleFeature) {
        toggleFeature.handle({ items: this.items!.toArray(), item: this.draggedItem!, event });

        const feature = this.injector.get(CreateDragAndDropPlaceholderFeature);
        if (feature) {
          this.dragPlaceholder = feature.handle({ items: this.items!.toArray() });
          this.document.body.appendChild(this.dragPlaceholder);

          this.dropSubscriptions$.unsubscribe();
          this.dropSubscriptions$ = this.subscribeOnHoverItemWithChildren();

          this.isPlaceholderAttached = true;
        }
      }

    } else if (this.isPlaceholderAttached && this.dragPlaceholder) {

      let newPosition = Point.fromPoint(event.getPosition()).sub(this.onPointerDownPosition!).add(new Point(2, 2));
      this.dragPlaceholder.setAttribute('style',
        `left:${ this.onPointerDownPosition!.x }px; top:${ this.onPointerDownPosition!.y }px; transform: translate(${ newPosition.x }px, ${ newPosition.y }px)`
      );

      const folder = this.getFolderUnderPointer.handle({
        items: this.items!.toArray(),
        position: event.getPosition()
      });
      this.onHoverItemWithChildren$.next(folder);
    }
    return true;
  }

  private subscribeOnHoverItemWithChildren(): Subscription {
    return this.onHoverItemWithChildren$.pipe(
      distinctUntilChanged(), debounceTime(50)
    ).subscribe((handle: DragHandleDirective | undefined) => {
      this.itemForDrop?.hostElement.classList.remove(DROP_HOVERED_CLASS);
      this.itemForDrop = handle;
      handle?.hostElement.classList.add(DROP_HOVERED_CLASS);
    });
  }

  public onPointerUp(event: IPointerEvent): boolean {
    if (this.itemForDrop) {
      this.itemForDrop.hostElement.classList.remove(DROP_HOVERED_CLASS);
      const item = this.itemForDrop.viewModel!;
      let itemKey = item.key;
      if (item.type !== EEntityType.DIRECTORY) {
        itemKey = this.itemForDrop.viewModel!.parentKey;
      }
      this.dropToDirectory.emit(itemKey);
    } else {
      let element: Element | null = document.elementFromPoint(event.getPosition().x, event.getPosition().y);
      if ((element as HTMLElement) === this.hostElement) {
        this.dropToDirectory.emit(ROOT_DIRECTORY_KEY);
      }
    }

    this.finalizeDragSequence();
    this.onChanges.emit();

    return true;
  }

  public override finalizeDragSequence(): void {
    this.itemForDrop = undefined;
    this.dropSubscriptions$.unsubscribe();
    this.dropSubscriptions$ = Subscription.EMPTY;
    this.isPlaceholderAttached = false;
    this.onPointerDownPosition = undefined;
    this.draggedItem = undefined;
    this.dragPlaceholder?.remove();
    this.dragPlaceholder = undefined;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
    this.dropSubscriptions$.unsubscribe();
  }
}

