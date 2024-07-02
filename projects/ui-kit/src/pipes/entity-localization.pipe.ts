import { Pipe, PipeTransform } from '@angular/core';
import { LOCALIZATION } from '@resources';

@Pipe({
  name: 'entityLocalization',
  standalone: true
})
export class EntityLocalizationPipe implements PipeTransform {

  public transform(type: string | undefined): string {
    // @ts-ignore
    return LOCALIZATION[type]?.name;
  }
}
