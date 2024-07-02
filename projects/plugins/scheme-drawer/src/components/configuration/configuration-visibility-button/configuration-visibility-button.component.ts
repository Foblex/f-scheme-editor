import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FIconButtonComponent } from '@ui-kit';
import { MatIcon } from '@angular/material/icon';
import { IConfigurationComponent } from '../configuration-component';

@Component({
  selector: 'configuration-visibility-button',
  templateUrl: './configuration-visibility-button.component.html',
  styleUrls: [ './configuration-visibility-button.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FIconButtonComponent,
    MatIcon
  ],
})
export class ConfigurationVisibilityButtonComponent {

  @Input({ required: true })
  public control!: IConfigurationComponent;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public toggle(): void {
    this.control.formControl.setValue(!this.control.formControl.value);
    this.changeDetectorRef.markForCheck();
  }
}
