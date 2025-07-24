import { Directive, ElementRef } from '@angular/core';
import { ExplorerPanelItemComponent } from '../../components';
import { ITreeItem } from '../../domain';
import {IHasHostElement} from "@foblex/flow";
import {deepCloneNode} from "@foblex/utils";

@Directive({
  selector: '[epDragHandle]',
  standalone: true
})
export class DragHandleDirective implements IHasHostElement {

  public get hostElement(): HTMLElement {
    return this.elementReference.nativeElement;
  }

  public get viewModel(): ITreeItem | undefined {
    return this.component.viewModel;
  }

  constructor(
    private elementReference: ElementRef<HTMLElement>,
    private component: ExplorerPanelItemComponent
  ) {
  }

  public cloneDomElement(): HTMLElement {
    return deepCloneNode(this.hostElement);
  }
}

