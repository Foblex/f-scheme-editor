import { AbstractControl, FormControl } from '@angular/forms';
import { IConfigurationRow } from '../../configuration-row/domain';
import { IConfigurationSection } from '../../configuration-section/domain';
import { EConfigurationComponentType } from './e-configuration-component-type';
import { IConfigurationComponent } from '../../configuration-component';
import { getBorderRadiusPanelConfiguration, getPaddingPanelConfiguration } from '../../configuration-mixed';
import {IIdName} from "@core";

export class ConfigurationExtensions {

  public static createSection(title: string, rows: IConfigurationRow[], control?: IConfigurationComponent): IConfigurationSection {
    return {
      title,
      rows,
      control
    };
  }

  public static createRow(components: IConfigurationComponent[]): IConfigurationRow {
    return {
      components,
    };
  }

  private static createComponent(type: EConfigurationComponentType, formControl: AbstractControl<any, any>, prefix?: string, options?: IIdName[]): IConfigurationComponent {
    return {
      type,
      formControl: formControl as FormControl<boolean>,
      prefix,
      options
    };
  }

  public static visibilityComponent(formControl: AbstractControl<any, any>): IConfigurationComponent {
    return this.createComponent(EConfigurationComponentType.VISIBILITY, formControl);
  }

  public static colorComponent(formControl: AbstractControl<any, any>): IConfigurationComponent {
    return this.createComponent(EConfigurationComponentType.COLOR, formControl);
  }

  public static imageComponent(formControl: AbstractControl<any, any>): IConfigurationComponent {
    return this.createComponent(EConfigurationComponentType.IMAGE, formControl);
  }

  public static checkboxComponent(formControl: AbstractControl<any, any>, label: string): IConfigurationComponent {
    return {
      type: EConfigurationComponentType.CHECKBOX,
      formControl: formControl as FormControl<boolean>,
      label
    };
  }

  public static selectComponent(formControl: AbstractControl<any, any>, prefix: string, options: IIdName[]): IConfigurationComponent {
    return this.createComponent(EConfigurationComponentType.SELECT, formControl, prefix, options);
  }

  public static markerDropDown(formControl: AbstractControl<any, any>): IConfigurationComponent {
    return {
      type: EConfigurationComponentType.MARKER_DROP_DOWN,
      formControl: formControl as FormControl<string>,
      options: []
    }
  }

  public static inputComponent(formControl: AbstractControl<any, any>, prefix: string): IConfigurationComponent {
    return this.createComponent(EConfigurationComponentType.INPUT, formControl, prefix);
  }

  public static coordinateInputComponent(formControl: AbstractControl<any, any>, prefix: string, enabled?: boolean): IConfigurationComponent {
    return {
      type: EConfigurationComponentType.COORDINATE_INPUT,
      formControl: formControl as FormControl<number>,
      prefix,
      enabled
    }
  }

  public static textComponent(formControl: AbstractControl<any, any>): IConfigurationComponent {
    return this.createComponent(EConfigurationComponentType.TEXT_AREA, formControl);
  }

  public static paddingPanel(formControl: AbstractControl<any, any>): IConfigurationComponent {
    return {
      type: EConfigurationComponentType.MIXED_PANEL,
      formControl: formControl as FormControl<boolean>,
      mixedPanel: getPaddingPanelConfiguration()
    }
  }

  public static borderRadiusPanel(formControl: AbstractControl<any, any>): IConfigurationComponent {
    return {
      type: EConfigurationComponentType.MIXED_PANEL,
      formControl: formControl as FormControl<boolean>,
      mixedPanel: getBorderRadiusPanelConfiguration()
    }
  }
}
