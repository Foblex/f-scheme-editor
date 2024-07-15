import { IHandler } from '@foblex/core';
import { Injectable } from '@angular/core';
import { GetSchemeConnectionConfigurationRequest } from './get-scheme-connection-configuration.request';
import { Observable, of } from 'rxjs';
import { IScheme } from '../../i-scheme';
import { EEntityType, StorageService } from '@core';
import { FormControl, FormGroup } from '@angular/forms';
import { ISchemeConnection } from '../../i-scheme-connection';
import { SchemeConnectionForm, SchemeConnectionFormSubscription } from './form';
import { IConfigurationSection } from '../../../components/configuration/configuration-section/domain';
import {
  ConfigurationExtensions, getColorSection, getConnectableSideOptions, getConnectionBehaviourOptions,
  getConnectionTypeOptions,
  getLineTypeOptions, getMarkerOptions,
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
        this.getConnectionColorSection(formBuilder.getForm()),
        this.getConnectionStyleSection(formBuilder.getForm()),
        this.getConnectionBehaviourSection(formBuilder.getForm()),
        this.getConnectionTextSection(formBuilder.getForm()),
        this.getTextRectCommonSection(formBuilder.getForm()),
        getColorSection(formBuilder.getForm().get('text')!.get('rect')! as FormGroup, 'Fill', 'fill'),
      ],
    };
  }

  private getConnectionColorSection(formGroup: FormGroup): IConfigurationSection {
    const form = formGroup.get('style')!.get('color')!;
    return ConfigurationExtensions.createSection('Stroke', [
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.checkboxComponent(form.get('isGradient')!, 'Gradient'),
      ]),
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.colorComponent(form.get('color1')!),
        ConfigurationExtensions.colorComponent(form.get('color2')!),
      ]),
    ]);
  }

  private getConnectionStyleSection(formGroup: FormGroup): IConfigurationSection {
    const form = formGroup.get('style')!;
    return ConfigurationExtensions.createSection('Line Style', [
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.inputComponent(form.get('weight')!, 'line-size'),
        ConfigurationExtensions.selectComponent(form.get('style')!, 'line-type', getLineTypeOptions()),
      ]),
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.selectComponent(formGroup.get('markerStart')!, '', getMarkerOptions()),
        ConfigurationExtensions.selectComponent(formGroup.get('markerEnd')!, '', getMarkerOptions()),
      ]),
    ]);
  }

  private getConnectionBehaviourSection(formGroup: FormGroup): IConfigurationSection {
    return ConfigurationExtensions.createSection('Behaviour', [
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.selectComponent(formGroup.get('type')!, 'connection-type', getConnectionTypeOptions()),
        ConfigurationExtensions.selectComponent(formGroup.get('behaviour')!, 'connection-behaviour', getConnectionBehaviourOptions()),
      ]),
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.selectComponent(formGroup.get('connectionSideStart')!, 'connection-side', getConnectableSideOptions()),
        ConfigurationExtensions.selectComponent(formGroup.get('connectionSideEnd')!, 'connection-side', getConnectableSideOptions()),
      ]),
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.inputComponent(formGroup.get('offset')!, 'connection-offset'),
        ConfigurationExtensions.inputComponent(formGroup.get('radius')!, 'radius'),
      ]),
    ]);
  }

  private getConnectionTextSection(formGroup: FormGroup): IConfigurationSection {
    const form = formGroup.get('text')!;
    return ConfigurationExtensions.createSection('Text', [
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.textComponent(form.get('text')!),
      ]),
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.inputComponent(form.get('size')!, 'font-size'),
        ConfigurationExtensions.colorComponent(form.get('color')!),
      ]),
    ]);
  }

  private getTextRectCommonSection(formGroup: FormGroup): IConfigurationSection {
    const form = formGroup.get('text')!.get('rect')! as FormGroup;
    return ConfigurationExtensions.createSection('Rect', [
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.coordinateInputComponent(form.get('width') as FormControl<any>, 'W', true),
        ConfigurationExtensions.coordinateInputComponent(form.get('height') as FormControl<any>, 'H', true),
      ]),
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.paddingPanel(form.get('padding') as FormControl<any>),
        ConfigurationExtensions.borderRadiusPanel(form.get('borderRadius') as FormControl<any>),
      ]),
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.checkboxComponent(form.get('isClipContent') as FormControl<any>, 'Clip content')
      ])
    ])
  }
}
