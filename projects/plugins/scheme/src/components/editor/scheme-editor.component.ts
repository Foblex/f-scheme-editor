import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef, EventEmitter,
  Input,
  OnDestroy, OnInit, Output,
  ViewChild,
} from '@angular/core';
import { merge, Subject, Subscription, take } from 'rxjs';
import {
  ESchemeBackground,
  ISchemeNodeViewModel,
  ISchemeViewModel
} from '../../domain';
import { SchemeApiService } from '../../domain';
import {
  EFConnectionBehavior, EFMarkerType, FCanvasChangeEvent,
  FCanvasComponent, FCreateConnectionEvent, FCreateNodeEvent,
  FFlowComponent, FFlowModule, FReassignConnectionEvent, FSelectionChangeEvent,
  FZoomDirective
} from '@foblex/flow';
import { SchemeEditorToolbarComponent } from '../toolbar/scheme-editor-toolbar.component';
import { SchemeEditorPaletteComponent } from '../palette/scheme-editor-palette.component';
import { startWith } from 'rxjs/operators';
import { NgTemplateOutlet } from '@angular/common';
import { SNodeComponent } from '../node/s-node.component';
import { IPoint, IRect, Point, RectExtensions } from '@foblex/core';
import { ConnectionMarkersComponent } from '../markers/connection-markers.component';
import { SchemeEditorClassListService } from './scheme-editor-class-list.service';
import { SConnectionTextStyleDirective } from './s-connection-text-style.directive';
import { SBackgroundStyleDirective } from './s-background-style.directive';
import { FEditorContainerEvents } from '@ui-kit';
import { EConnectionMarker } from '../configuration';

@Component({
  selector: 'scheme-editor',
  templateUrl: './scheme-editor.component.html',
  styleUrls: [ './scheme-editor.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ SchemeEditorClassListService ],
  imports: [
    FFlowModule,
    SchemeEditorToolbarComponent,
    SchemeEditorPaletteComponent,
    SNodeComponent,
    NgTemplateOutlet,
    ConnectionMarkersComponent,
    SConnectionTextStyleDirective,
    SBackgroundStyleDirective,
  ]
})
export class SchemeEditorComponent implements OnInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  protected _key!: string;

  @Input({ required: true })
  public set key(key: string) {
    this._key = key;
    this.hasChanges$.next();
  };

  public get key(): string {
    return this._key;
  }

  public viewModel: ISchemeViewModel | null = null;

  @ViewChild(FFlowComponent, { static: false })
  public fFlowComponent!: FFlowComponent;

  @ViewChild(FCanvasComponent, { static: false })
  public fCanvasComponent!: FCanvasComponent;

  @ViewChild(FZoomDirective, { static: false })
  public fZoomDirective!: FZoomDirective;

  private hasChanges$: Subject<void> = new Subject<void>();

  public eConnectionBehavior = EFConnectionBehavior;

  public eMarkerType = EFMarkerType;

  public eConnectionMarker = EConnectionMarker;

  public eSchemeBackground = ESchemeBackground;

  @Output()
  public onSelectionChange: EventEmitter<FSelectionChangeEvent> = new EventEmitter<FSelectionChangeEvent>();

  constructor(
    private elementRef: ElementRef,
    private apiService: SchemeApiService,
    private schemeEditorClassListService: SchemeEditorClassListService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.subscriptions$.add(this.subscribeReloadEvents());
  }

  private subscribeReloadEvents(): Subscription {
    return merge(
      this.hasChanges$,
      FEditorContainerEvents.reloadComponentEvent,
    ).pipe(startWith(null)).subscribe(() => {
      this.getData();
    });
  }

  private getData(): void {
    this.apiService.getScheme(this.key).pipe(take(1)).subscribe((result) => {
      this.viewModel = result;
      setTimeout(() => {
        this.schemeEditorClassListService.updateClasses(result.connections);
      })
      this.changeDetectorRef.detectChanges();
    });
  }

  public onLoaded(): void {
    if(this.viewModel?.visualState.position) {
      return;
    }
    this.fCanvasComponent?.fitToScreen(new Point(10, 10), false);
  }

  public onCreateNode(event: FCreateNodeEvent): void {
    this.apiService.addNodeToScheme(this.key, event.data, event.rect).pipe(take(1)).subscribe(() => {
      this.hasChanges$.next();
    });
  }

  public onCreateConnection(event: FCreateConnectionEvent): void {
    if (!event.fInputId) {
      return;
    }

    this.apiService.createConnection(this.key, event.fOutputId, event.fInputId).pipe(take(1)).subscribe(() => {
      this.hasChanges$.next();
    });
  }

  public onReassignConnection(event: FReassignConnectionEvent): void {
    this.apiService.reassignConnection(this.key, event.connectionId, event.newFInputId).pipe(take(1)).subscribe(() => {
      this.hasChanges$.next();
    });
  }

  public onMoveNode(node: ISchemeNodeViewModel, position: IPoint): void {
    const rect = RectExtensions.initialize(
      position.x,
      position.y,
      node.rectStyle.width,
      node.rectStyle.height
    );

    this.apiService.transformNode(this.key, node.key, rect).pipe(take(1)).subscribe();
  }

  public onResizeNode(nodeKey: string, rect: IRect): void {
    this.apiService.transformNode(this.key, nodeKey, rect).pipe(take(1)).subscribe();
  }

  public onCanvasChange(event: FCanvasChangeEvent): void {
    this.apiService.transformCanvas(this.viewModel!.key, event).pipe(take(1)).subscribe();
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
