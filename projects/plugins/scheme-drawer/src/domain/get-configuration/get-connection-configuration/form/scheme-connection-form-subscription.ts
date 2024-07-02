import { FormGroup } from '@angular/forms';
import { distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { EditorContainerEvents } from '@editor-container';
import { StorageService } from '@core';
import { ISchemeConnection } from '../../../i-scheme-connection';
import { SchemeConnectionForm } from './scheme-connection-form';
import { EFConnectionType } from '@foblex/flow';

export class SchemeConnectionFormSubscription {

  private get formGroup(): FormGroup {
    return this.formBuilder.getForm();
  }

  constructor(
    private storage: StorageService,
    private connection: ISchemeConnection,
    private formBuilder: SchemeConnectionForm
  ) {
  }

  public subscribe(): Subscription {
    return this.formGroup.valueChanges.pipe(distinctUntilChanged(), switchMap(() => {
      const value = this.formGroup.getRawValue();
      this.mapFormToConnection(value);
      return this.storage.saveData();
    })).subscribe(() => EditorContainerEvents.reloadComponentEvent.next());
  }

  private mapFormToConnection(value: any): void {
    this.connection.type = value.type;
    this.connection.behaviour = value.behaviour;
    this.connection.connectionSideStart = value.connectionSideStart;
    this.connection.connectionSideEnd = value.connectionSideEnd;
    this.connection.radius = this.formBuilder.isRadiusDisabled(value.type) ? this.connection.radius : value.radius;
    this.connection.offset = this.formBuilder.isOffsetDisabled(value.type) ? this.connection.offset : value.offset;
    // mapLineStyleFormToModel(this.formGroup.get('lineStyle') as FormGroup, this.connection.lineStyle);
    // mapTextFormToModel(this.formGroup.get('text') as FormGroup, this.connection.text);
    this.toggleRadiusControl();
    this.toggleOffsetControl();
  }

  public toggleRadiusControl(): void {
    const value = this.formGroup.getRawValue();
    if (this.isRadiusDisabled(value.type)) {
      this.formGroup.get('radius')?.disable({ emitEvent: false });
    } else {
      this.formGroup.get('radius')?.enable({ emitEvent: false });
    }
  }

  public isRadiusDisabled(type: EFConnectionType): boolean {
    return type === EFConnectionType.STRAIGHT || type === EFConnectionType.BEZIER;
  }

  public toggleOffsetControl(): void {
    const value = this.formGroup.getRawValue();
    if (this.isOffsetDisabled(value.type)) {
      this.formGroup.get('offset')?.disable({ emitEvent: false });
    } else {
      this.formGroup.get('offset')?.enable({ emitEvent: false });
    }
  }

  public isOffsetDisabled(type: EFConnectionType): boolean {
    return type === EFConnectionType.STRAIGHT;
  }
}
