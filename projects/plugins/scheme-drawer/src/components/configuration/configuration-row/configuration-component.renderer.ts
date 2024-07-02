import { Directive, Input, ViewContainerRef } from '@angular/core';
import { RENDERER_COMPONENTS } from '../renderer-components';
import { IConfigurationComponent } from '../configuration-component';

@Directive({
  selector: '[configuration-component-renderer]',
  standalone: true
})
export class SchemeFormComponentRenderer {

  @Input({ required: true })
  public set data(data: IConfigurationComponent[]) {
    this.render(data);
  };

  constructor(
    private container: ViewContainerRef
  ) {
  }

  public render(data: IConfigurationComponent[]): void {
    this.container.clear();
    data.forEach((x) => {
      const componentRef = this.container.createComponent(
        RENDERER_COMPONENTS[x.type]
      );

      componentRef.instance.control = {
        formControl: x.formControl,
        prefix: x.prefix,
        options: x.options,
        label: x.label,
        mixedPanel: x.mixedPanel
      }
    });
  }
}

