import { Injectable } from '@angular/core';
import { GetSchemeNodeConfigurationRequest } from './get-scheme-node-configuration.request';
import { Observable, of } from 'rxjs';
import { IScheme } from '../../i-scheme';
import { EEntityType, StorageService } from '@core';
import { ISchemeNode } from '../../i-scheme-node';
import { SchemeNodeForm, SchemeNodeFormSubscription } from './form';
import { FormControl, FormGroup } from '@angular/forms';
import { IConfigurationSection } from '../../../components/configuration/configuration-section/domain';
import {
  ConfigurationExtensions,
  getBorderSection,
  getColorSection,
  getImageSection,
  IConfiguration
} from '../../../components/configuration';
import {IHandler} from "@foblex/mediator";

@Injectable()
export class GetSchemeNodeConfigurationHandler
  implements IHandler<GetSchemeNodeConfigurationRequest, Observable<IConfiguration>> {

  constructor(
    private storage: StorageService,
  ) {
  }

  public handle(payload: GetSchemeNodeConfigurationRequest): Observable<IConfiguration> {
    return of(this.getScheme(this.getItem(payload.key, payload.nodeKey)));
  }

  private getItem(key: string, itemKey: string): ISchemeNode {
    return this.getEntity(key).nodes.find((c) => c.key === itemKey)!;
  }

  private getEntity(key: string): IScheme {
    return this.storage.getEntity<IScheme>(key, EEntityType.SCHEME_DRAWER)!;
  }

  private getScheme(item: ISchemeNode): IConfiguration {
    const formBuilder = new SchemeNodeForm(item);

    const rectFormGroup = formBuilder.getForm().get('rect') as FormGroup;

    return {
      subscription: new SchemeNodeFormSubscription(this.storage, item, formBuilder).subscribe(),
      sections: [
        this.getCommonSection(rectFormGroup),
        getColorSection(rectFormGroup, 'Fill', 'fill'),
        getBorderSection(rectFormGroup.get('border') as FormGroup, 'Border'),
        getImageSection(formBuilder.getForm(), 'Image', 'image'),
      ],
    };
  }

  private getCommonSection(formGroup: FormGroup): IConfigurationSection {
    return ConfigurationExtensions.createSection('Node', [
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.coordinateInputComponent(formGroup.get('x') as FormControl<any>, 'X'),
        ConfigurationExtensions.coordinateInputComponent(formGroup.get('y') as FormControl<any>, 'Y'),
      ]),
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.coordinateInputComponent(formGroup.get('width') as FormControl<any>, 'W'),
        ConfigurationExtensions.coordinateInputComponent(formGroup.get('height') as FormControl<any>, 'H'),
      ]),
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.paddingPanel(formGroup.get('padding') as FormControl<any>),
        ConfigurationExtensions.borderRadiusPanel(formGroup.get('borderRadius') as FormControl<any>),
      ]),
      ConfigurationExtensions.createRow([
        ConfigurationExtensions.checkboxComponent(formGroup.get('isClipContent') as FormControl<any>, 'Clip content')
      ]),
    ]);
  }

  // private getConnectionTextSection(formGroup: FormGroup): IConfigurationSection {
  //   const textFormGroup = formGroup.get('text')!;
  //   return ConfigurationExtensions.createSection('Text', [
  //     ConfigurationExtensions.createRow([
  //       ConfigurationExtensions.textComponent(textFormGroup.get('text')!),
  //     ]),
  //     ConfigurationExtensions.createRow([
  //       ConfigurationExtensions.inputComponent(textFormGroup.get('size')!, 'font-size'),
  //       ConfigurationExtensions.colorComponent(textFormGroup.get('color')!),
  //     ]),
  //   ]);
  // }
}
