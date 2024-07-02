import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { IConfigurationComponent } from '../configuration-component';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'configuration-drop-down',
  templateUrl: './configuration-drop-down.component.html',
  standalone: true,
  host: {
    class: 'configuration-component',
  },
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatIcon,
    MatPrefix,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationDropDownComponent implements OnInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  public control!: IConfigurationComponent;

  public prefix: string | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.subscriptions$.add(this.subscribeOnValueChanges());
  }

  private subscribeOnValueChanges(): Subscription {
    return this.control.formControl.valueChanges.pipe(startWith(null)).subscribe(() => {
      this.prefix = this.getPrefix();
      this.changeDetectorRef.markForCheck();
    });
  }

  private getPrefix(): string | undefined {
    const option = this.control.options!.find(option => option.id === this.control.formControl.value);
    return option?.icon;
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
