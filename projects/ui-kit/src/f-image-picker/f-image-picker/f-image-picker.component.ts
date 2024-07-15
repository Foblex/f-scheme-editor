import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, OnDestroy, Output, ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FImagePickerPreviewComponent } from '../f-image-picker-preview/f-image-picker-preview.component';
import { defaultFImage, IFImage } from '../../f-common';
import {
  FImagePickerConfigurationComponent
} from '../f-image-picker-configuration/f-image-picker-configuration.component';

@Component({
  selector: 'f-image-picker',
  templateUrl: './f-image-picker.component.html',
  styleUrls: [ './f-image-picker.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FImagePickerPreviewComponent,
    FImagePickerConfigurationComponent
  ]
})
export class FImagePickerComponent implements AfterViewInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  private value: IFImage = defaultFImage();

  @Input()
  public set image(value: IFImage) {
    this.value = value;
    this.redraw();
  }

  @ViewChild(FImagePickerConfigurationComponent, { static: true })
  public fConfiguration?: FImagePickerConfigurationComponent;

  @Output()
  public valueChange: EventEmitter<IFImage> = new EventEmitter<IFImage>();

  public ngAfterViewInit(): void {
    this.redraw();
  }

  private redraw(): void {
    this.fConfiguration!.image = this.value;
  }

  public onValueChanged(value: IFImage): void {
    this.valueChange.emit(value);
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
