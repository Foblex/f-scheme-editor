import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  Output, TemplateRef,
  ViewChild
} from '@angular/core';
import { Subscription, take } from 'rxjs';
import { ICONS, LOCALIZATION } from '@resources';
import { ClipboardService, ECommonMenuAction, EKeyboardEvent, ROOT_DIRECTORY_KEY } from '@core';
import { SelectionService } from '../../services';
import { EP_CLIPBOARD_TOKEN } from '../../domain';
import { MatIcon } from '@angular/material/icon';
import { NewItemContextMenuComponent } from './new-item-context-menu';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ShortcutPipe } from '@ui-kit';

@Component({
  selector: 'ep-context-menu',
  exportAs: 'menuComponent',
  templateUrl: './context-menu.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    NewItemContextMenuComponent,
    CdkMenu,
    CdkMenuItem,
    ShortcutPipe,
    CdkMenuTrigger,
  ]
})
export class ContextMenuComponent implements OnDestroy {

  @ViewChild(TemplateRef, { static: true })
  public template!: TemplateRef<CdkMenu>;

  private subscriptions$: Subscription = new Subscription();

  public ACTION = ECommonMenuAction;

  public icons = ICONS;

  public localization = LOCALIZATION;

  public shortcuts = EKeyboardEvent;

  @Output()
  public onContextMenuAction: EventEmitter<ECommonMenuAction> = new EventEmitter<ECommonMenuAction>();

  public isCutEnabled: boolean = false;

  public isDeleteEnabled: boolean = false;

  public isCopyEnabled: boolean = false;

  public isRenameEnabled: boolean = false;

  public isPasteEnabled: boolean = false;

  public isReadClipboardGranted: boolean = false;

  public isWriteClipboardGranted: boolean = false;

  constructor(
      private selectionService: SelectionService,
      private clipboardService: ClipboardService,
      private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public initialize(): void {
    this.isRenameEnabled = this.getRenameEnabled();
    this.isCutEnabled = this.getCutEnabled();
    this.isCopyEnabled = this.getCopyEnabled();
    this.isDeleteEnabled = this.getDeleteEnabled();
    this.getPasteEnabled();
    this.isReadClipboardEnabled();
    this.isWriteClipboardEnabled();
  }

  private getCutEnabled(): boolean {
    // const length = this.selectionService.allSelected.length;
    // return length > 0 && !this.selectionService.allSelected.includes(ROOT_DIRECTORY_KEY);
    //
    return false;
  }

  private getRenameEnabled(): boolean {
    const length = this.selectionService.allSelected.length;
    return length === 1 && !this.selectionService.allSelected.includes(ROOT_DIRECTORY_KEY);
  }

  private getDeleteEnabled(): boolean {
    const length = this.selectionService.allSelected.length;
    return length > 0 && !this.selectionService.allSelected.includes(ROOT_DIRECTORY_KEY);
  }

  private getCopyEnabled(): boolean {
    const length = this.selectionService.allSelected.length;
    return length > 0;
  }

  private getPasteEnabled(): void {
    this.clipboardService.paste(EP_CLIPBOARD_TOKEN).pipe(take(1)).subscribe((result) => {
      this.isPasteEnabled = !!result;
    });
  }

  private isWriteClipboardEnabled(): void {
    this.clipboardService.isWriteGranted().pipe(take(1)).subscribe((result) => {
      this.isWriteClipboardGranted = result;
    });
  }

  private isReadClipboardEnabled(): void {
    this.clipboardService.isReadGranted().pipe(take(1)).subscribe((result) => {
      this.isReadClipboardGranted = result;
    });
  }

  public onSelectionChange(event: string): void {
    // @ts-ignore
    this.onContextMenuAction.emit(event);
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
