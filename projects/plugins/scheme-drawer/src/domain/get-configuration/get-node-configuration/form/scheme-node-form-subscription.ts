import { FormGroup } from '@angular/forms';
import { distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { EditorContainerEvents } from '@editor-container';
import { StorageService } from '@core';
import { ISchemeNodeForm, SchemeNodeForm } from './scheme-node-form';
import { ISchemeNode } from '../../../i-scheme-node';

export class SchemeNodeFormSubscription {

  private get formGroup(): FormGroup {
    return this.formBuilder.getForm();
  }

  constructor(
    private storage: StorageService,
    private item: ISchemeNode,
    private formBuilder: SchemeNodeForm
  ) {
  }

  public subscribe(): Subscription {
    return this.formGroup.valueChanges.pipe(distinctUntilChanged(), switchMap(() => {
      const value = this.formGroup.getRawValue();
      this.mapFormToConnection(value);
      return this.storage.saveData();
    })).subscribe(() => EditorContainerEvents.reloadComponentEvent.next());
  }

  private mapFormToConnection(value: ISchemeNodeForm): void {
    this.item.rectStyle.background = value.fill;
    this.item.rectStyle.border.isBorder = value.border.isBorder;
    this.item.rectStyle.border.color = value.border.color;
    this.item.rectStyle.border.width = value.border.width;
    this.item.rectStyle.border.style = value.border.style;
    this.item.rectStyle.borderRadius = {
      topLeft: value.borderRadius.value1,
      topRight: value.borderRadius.value2,
      bottomLeft: value.borderRadius.value3,
      bottomRight: value.borderRadius.value4
    };
    this.item.rectStyle.padding = {
      top: value.padding.value1,
      right: value.padding.value2,
      bottom: value.padding.value3,
      left: value.padding.value4
    };
    this.item.rectStyle.isClipContent = value.isClipContent;

   // this.item.rectStyle.padding = value.padding;
  }
}
