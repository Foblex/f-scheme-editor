import { IHandler } from '@foblex/core';
import { Injectable } from '@angular/core';
import { GetSchemeConnectionConfigurationRequest } from './get-scheme-connection-configuration.request';
import { Observable, of } from 'rxjs';
import { IScheme } from '../../i-scheme';
import { EEntityType, StorageService } from '@core';
import { FormGroup } from '@angular/forms';
import { ISchemeConnection } from '../../i-scheme-connection';
import { SchemeConnectionForm, SchemeConnectionFormSubscription } from './form';
import { IConfigurationSection } from '../../../components/configuration/configuration-section/domain';
import {
  ConfigurationExtensions, getConnectableSideOptions, getConnectionBehaviourOptions,
  getConnectionTypeOptions,
  getLineTypeOptions,
  IConfiguration
} from '../../../components/configuration';


@Injectable()
export class GetSchemeConnectionConfigurationHandler
  implements IHandler<GetSchemeConnectionConfigurationRequest, Observable<IConfiguration>> {

  constructor(
    private storage: StorageService
  ) {
  }

  public handle(payload: GetSchemeConnectionConfigurationRequest): Observable<IConfiguration> {
    return of(this.getScheme(this.getItem(payload.key, payload.connectionKey)));
  }

  private getItem(key: string, itemKey: string): ISchemeConnection {
    return this.getEntity(key).connections.find((c) => c.key === itemKey)!;
  }

  private getEntity(key: string): IScheme {
    return this.storage.getEntity<IScheme>(key, EEntityType.SCHEME_DRAWER)!;
  }

  private getScheme(connection: ISchemeConnection): IConfiguration {
    const formBuilder = new SchemeConnectionForm(connection);
    return {
      subscription: new SchemeConnectionFormSubscription(this.storage, connection, formBuilder).subscribe(),
      sections: [
        // this.getConnectionStrokeSection(formBuilder.getForm()),
        // this.getConnectionBehaviourSection(formBuilder.getForm()),
        // this.getConnectionTextSection(formBuilder.getForm()),
        //   getRectScheme(formBuilder.getForm()!.get('text')!.get('container') as FormGroup, 'Text Container'),
      ],
    };
  }

  // private getConnectionStrokeSection(formGroup: FormGroup): IConfigurationSection {
  //   const lineStyleFormGroup = formGroup.get('lineStyle')!;
  //   return ConfigurationExtensions.createSection('Stroke', [
  //     ConfigurationExtensions.createRow([
  //       ConfigurationExtensions.checkboxComponent('Gradient', lineStyleFormGroup.get('isGradient')!),
  //       ConfigurationExtensions.colorComponent('Color', lineStyleFormGroup.get('color1')!),
  //       ConfigurationExtensions.colorComponent('End Color', lineStyleFormGroup.get('color2')!),
  //     ]),
  //     ConfigurationExtensions.createRow([
  //       ConfigurationExtensions.inputComponent('Line Size', lineStyleFormGroup.get('width')!, 'line-size'),
  //       ConfigurationExtensions.selectComponent('Line Type', lineStyleFormGroup.get('style')!, 'line-type', getLineTypeOptions()),
  //     ]),
  //   ]);
  // }

  // private getConnectionBehaviourSection(formGroup: FormGroup): IConfigurationSection {
  //   return ConfigurationExtensions.createSection('Behaviour', [
  //     ConfigurationExtensions.createRow([
  //       ConfigurationExtensions.selectComponent('Type', formGroup.get('type')!, 'connection-type', getConnectionTypeOptions()),
  //       ConfigurationExtensions.selectComponent('Behaviour', formGroup.get('behaviour')!, 'connection-behaviour', getConnectionBehaviourOptions()),
  //     ]),
  //     ConfigurationExtensions.createRow([
  //       ConfigurationExtensions.selectComponent('Connection side start', formGroup.get('connectionSideStart')!, 'connection-side', getConnectableSideOptions()),
  //       ConfigurationExtensions.selectComponent('Connection side end', formGroup.get('connectionSideEnd')!, 'connection-side', getConnectableSideOptions()),
  //     ]),
  //     ConfigurationExtensions.createRow([
  //       ConfigurationExtensions.inputComponent('Line Offset', formGroup.get('offset')!, 'connection-offset'),
  //       ConfigurationExtensions.inputComponent('Line Radius', formGroup.get('radius')!, 'radius'),
  //     ]),
  //   ]);
  // }
  //
  // private getConnectionTextSection(formGroup: FormGroup): IConfigurationSection {
  //   const textFormGroup = formGroup.get('text')!;
  //   return ConfigurationExtensions.createSection('Text', [
  //     ConfigurationExtensions.createRow([
  //       ConfigurationExtensions.textComponent('Text', textFormGroup.get('text')!),
  //     ]),
  //     ConfigurationExtensions.createRow([
  //       ConfigurationExtensions.inputComponent('Font Size', textFormGroup.get('size')!, 'font-size'),
  //       ConfigurationExtensions.colorComponent('Text Color', textFormGroup.get('color')!),
  //     ]),
  //   ]);
  // }
}
