import { ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';
import { RENDERER_COMPONENTS } from '../renderer-components';
import { ConfigurationRowComponent } from '../configuration-row';
import { IConfigurationRow } from '../configuration-row/domain';
import { EConfigurationComponentType } from '../configuration-root';

@Directive({
  selector: '[configuration-row-renderer]',
  standalone: true
})
export class ConfigurationRowRenderer {

  @Input({ required: true })
  public set data(data: IConfigurationRow[]) {
    this.render(data);
  };

  constructor(
    private container: ViewContainerRef
  ) {
  }

  public render(data: IConfigurationRow[]): void {
    this.container.clear();
    data.forEach((x) => {
      const componentRef: ComponentRef<ConfigurationRowComponent> = this.container.createComponent(
        RENDERER_COMPONENTS[ EConfigurationComponentType.ROW ]
      );
      componentRef.instance.children = x.components;
    });
  }
}

