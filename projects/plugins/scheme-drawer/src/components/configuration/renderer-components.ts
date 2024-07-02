import { ConfigurationDropDownComponent } from './configuration-drop-down';
import { ConfigurationColorComponent } from './configuration-color';
import { ConfigurationCheckboxComponent } from './configuration-checkbox';
import { SchemeInputComponent } from './scheme-input/scheme-input.component';
import { Type } from '@angular/core';
import { SchemeTextareaComponent } from './scheme-textarea/scheme-textarea.component';
import { ConfigurationMixedComponent } from './configuration-mixed';
import { ConfigurationSectionComponent } from './configuration-section';
import { ConfigurationRowComponent } from './configuration-row';
import { EConfigurationComponentType } from './configuration-root';
import { ConfigurationCoordinateInputComponent } from './configuration-coordinate-input';

export const RENDERER_COMPONENTS: { [ index: string ]: Type<any> } = {

  [ EConfigurationComponentType.SECTION.toString() ]: ConfigurationSectionComponent,

  [ EConfigurationComponentType.ROW.toString() ]: ConfigurationRowComponent,

  [ EConfigurationComponentType.SELECT.toString() ]: ConfigurationDropDownComponent,

  [ EConfigurationComponentType.COLOR.toString() ]: ConfigurationColorComponent,

  [ EConfigurationComponentType.CHECKBOX.toString() ]: ConfigurationCheckboxComponent,

  [ EConfigurationComponentType.INPUT.toString() ]: SchemeInputComponent,

  [ EConfigurationComponentType.COORDINATE_INPUT.toString() ]: ConfigurationCoordinateInputComponent,

  [ EConfigurationComponentType.TEXT_AREA.toString() ]: SchemeTextareaComponent,

  [ EConfigurationComponentType.MIXED_PANEL.toString() ]: ConfigurationMixedComponent,
};
