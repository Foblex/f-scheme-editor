import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  F_OVERLAY_PANEL_COMPONENT, FOverlayPanelComponent, FOverlayPanelHeaderComponent,
  IFOverlayPanelComponent
} from '@ui-kit';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { IMixedPanelConfiguration, IMixedValue, MixedPanelForm } from '../domain';

@Component({
  selector: 'mixed-panel',
  templateUrl: './mixed-panel.component.html',
  styleUrls: [ './mixed-panel.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    FOverlayPanelHeaderComponent,
    FormsModule,
    MatFormField,
    MatInput,
    MatPrefix,
    ReactiveFormsModule
  ],
  providers: [ { provide: F_OVERLAY_PANEL_COMPONENT, useExisting: MixedPanelComponent } ]
})
export class MixedPanelComponent implements IFOverlayPanelComponent<IMixedValue> {

  @Input({ required: true })
  public configuration!: IMixedPanelConfiguration;

  public formBuilder: MixedPanelForm = new MixedPanelForm(this.fPanel);

  constructor(
    public fPanel: FOverlayPanelComponent
  ) {
  }

  public setValue(value: IMixedValue): void {
    this.formBuilder.setValue(value);
  }

  public onBlur(): void {
    this.formBuilder.onBlur();
  }
}
