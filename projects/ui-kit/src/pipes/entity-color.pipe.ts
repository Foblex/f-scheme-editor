import { Inject, Pipe, PipeTransform } from '@angular/core';
import { IEntity, IEntityPlugin, PLUGIN_TOKEN } from '@core';

@Pipe({
  name: 'entityColor',
  standalone: true
})
export class EntityColorPipe implements PipeTransform {

  constructor(
      @Inject(PLUGIN_TOKEN) private plugins: IEntityPlugin<IEntity>[],
  ) {
  }

  public transform(type: string | undefined): string {
    return this.plugins.find(p => p.type === type)?.color || '#000000';
  }
}

