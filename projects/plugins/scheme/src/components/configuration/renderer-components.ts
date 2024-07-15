import { ConfigurationDropDownComponent } from './configuration-drop-down';
import { ConfigurationColorComponent } from './configuration-color';
import { ConfigurationCheckboxComponent } from './configuration-checkbox';
import { SchemeInputComponent } from './scheme-input/scheme-input.component';
import { Type } from '@angular/core';
import { ConfigurationTextareaComponent } from './configuration-textarea/configuration-textarea.component';
import { ConfigurationMixedComponent } from './configuration-mixed';
import { ConfigurationSectionComponent } from './configuration-section';
import { ConfigurationRowComponent } from './configuration-row';
import { EConfigurationComponentType } from './configuration-root';
import { ConfigurationCoordinateInputComponent } from './configuration-coordinate-input';
import { ConfigurationImageComponent } from './configuration-image';

export const RENDERER_COMPONENTS: { [ index: string ]: Type<any> } = {

  [ EConfigurationComponentType.SECTION.toString() ]: ConfigurationSectionComponent,

  [ EConfigurationComponentType.ROW.toString() ]: ConfigurationRowComponent,

  [ EConfigurationComponentType.SELECT.toString() ]: ConfigurationDropDownComponent,

  [ EConfigurationComponentType.COLOR.toString() ]: ConfigurationColorComponent,

  [ EConfigurationComponentType.IMAGE.toString() ]: ConfigurationImageComponent,

  [ EConfigurationComponentType.CHECKBOX.toString() ]: ConfigurationCheckboxComponent,

  [ EConfigurationComponentType.INPUT.toString() ]: SchemeInputComponent,

  [ EConfigurationComponentType.COORDINATE_INPUT.toString() ]: ConfigurationCoordinateInputComponent,

  [ EConfigurationComponentType.TEXT_AREA.toString() ]: ConfigurationTextareaComponent,

  [ EConfigurationComponentType.MIXED_PANEL.toString() ]: ConfigurationMixedComponent,
};
