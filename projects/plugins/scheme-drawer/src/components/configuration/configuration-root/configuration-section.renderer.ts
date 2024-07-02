import { ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';
import { RENDERER_COMPONENTS } from '../renderer-components';
import { ConfigurationSectionComponent } from '../configuration-section';
import { IConfigurationSection } from '../configuration-section/domain';
import { EConfigurationComponentType } from './domain';

@Directive({
  selector: '[configuration-section-renderer]',
  standalone: true
})
export class ConfigurationSectionRenderer {

  @Input({ required: true })
  public set data(data: IConfigurationSection[]) {
    this.render(data);
  };

  constructor(
    private container: ViewContainerRef
  ) {
  }

  public render(data: IConfigurationSection[]): void {
    this.container.clear();
    data.forEach((x) => {
      const componentRef: ComponentRef<ConfigurationSectionComponent> = this.container.createComponent(
        RENDERER_COMPONENTS[EConfigurationComponentType.SECTION]
      );

      componentRef.instance.control = x.control;
      componentRef.instance.rows = x.rows;
      componentRef.instance.title = x.title;
    });
  }
}

