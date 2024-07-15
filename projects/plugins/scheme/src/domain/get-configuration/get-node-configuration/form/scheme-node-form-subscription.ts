import { FormGroup } from '@angular/forms';
import { distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { StorageService } from '@core';
import { SchemeNodeForm } from './scheme-node-form';
import { ISchemeNode } from '../../../i-scheme-node';
import { defaultFImage, FEditorContainerEvents } from '@ui-kit';
import { INodeFormModel } from './i-node-form-model';
import { FromRectFormModelToStorageModelMapper, FromRectFormModelToStorageModelRequest } from '../../rect';

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
      this.mapFormToConnection(this.formGroup.getRawValue());
      return this.storage.saveData();
    })).subscribe(() => FEditorContainerEvents.reloadComponentEvent.next());
  }

  private mapFormToConnection(value: INodeFormModel): void {
    this.item.image = value.image || defaultFImage();
    this.item.rectStyle = new FromRectFormModelToStorageModelMapper().handle(
      new FromRectFormModelToStorageModelRequest(value.rect, this.item.rectStyle)
    );
  }
}
