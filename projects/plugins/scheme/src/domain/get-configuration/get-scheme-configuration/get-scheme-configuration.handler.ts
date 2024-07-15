import { IHandler } from '@foblex/core';
import { Injectable } from '@angular/core';
import { GetSchemeConfigurationRequest } from './get-scheme-configuration.request';
import { debounceTime, distinctUntilChanged, Observable, of, Subscription, switchMap } from 'rxjs';
import { IScheme } from '../../i-scheme';
import { EEntityType, StorageService } from '@core';
import { FormControl, FormGroup } from '@angular/forms';
import { getColorSection, IConfiguration } from '../../../components/configuration';
import { getSchemeBackgroundSection } from './get-scheme-background-section';
import { FEditorContainerEvents } from '@ui-kit';

@Injectable()
export class GetSchemeConfigurationHandler
  implements IHandler<GetSchemeConfigurationRequest, Observable<IConfiguration>> {

  constructor(
    private storage: StorageService,
  ) {
  }

  public handle(payload: GetSchemeConfigurationRequest): Observable<IConfiguration> {
    const entity = this.getEntity(payload.key);
    const form = this.getForm(entity);

    return of(this.getScheme(form, this.formSubscription(form, entity)));
  }

  private getEntity(key: string): IScheme {
    return this.storage.getEntity<IScheme>(key, EEntityType.SCHEME_DRAWER)!;
  }

  private getForm(item: IScheme): FormGroup {
    return new FormGroup({
      background: new FormControl(item.background),
      fill: new FormControl(item.fill),
      stroke: new FormControl(item.stroke),
    });
  }

  private formSubscription(payload: FormGroup, item: IScheme): Subscription {
    return payload.valueChanges.pipe(debounceTime(10), distinctUntilChanged(), switchMap((value) => {
      item.background = value.background;
      item.fill = value.fill;
      item.stroke = value.stroke;
      return this.storage.saveData();
    })).subscribe(() => FEditorContainerEvents.reloadComponentEvent.next());
  }

  private getScheme(formGroup: FormGroup, formSubscription: Subscription): IConfiguration {
    return {
      subscription: formSubscription,
      sections: [
        getSchemeBackgroundSection(formGroup),
        getColorSection(formGroup, 'Fill', 'fill'),
        getColorSection(formGroup, 'Stroke', 'stroke'),
      ],
    };
  }
}
