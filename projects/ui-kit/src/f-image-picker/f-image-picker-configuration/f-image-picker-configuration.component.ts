import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  defaultFImage, EFImageMode, FLoadImageComponent,
  IFImage
} from '../../f-common';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FSliderIndicatorComponent } from '../../f-slider/f-slider-indicator.component';
import { FImagePickerPreviewComponent } from '../f-image-picker-preview/f-image-picker-preview.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FIconButtonComponent } from '../../f-icon-button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { IIdName } from '@foblex/core';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'f-image-picker-configuration',
  templateUrl: './f-image-picker-configuration.component.html',
  styleUrls: [ './f-image-picker-configuration.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSlider,
    MatSliderThumb,
    FSliderIndicatorComponent,
    ReactiveFormsModule,
    FIconButtonComponent,
    MatIcon,
    MatFormField,
    MatOption,
    MatSelect,
    FLoadImageComponent,
  ]
})
export class FImagePickerConfigurationComponent implements AfterViewInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();

  @Output()
  public valueChange: EventEmitter<IFImage> = new EventEmitter<IFImage>();

  @ViewChild('fileInput', { static: false })
  public fileInput!: ElementRef<HTMLInputElement>;

  private value: IFImage | undefined = defaultFImage();

  @Input()
  public set image(value: IFImage | undefined) {
    this.value = value;
    this.redraw();
  }

  public parameters: { key: string, value: number, min: number, max: number }[] = [];

  @ContentChild(FImagePickerPreviewComponent, { static: true })
  private fPreviewComponent!: FImagePickerPreviewComponent;

  public formGroup: FormGroup = new FormGroup({
    src: new FormControl(''),
    mode: new FormControl(EFImageMode.FILL),
    rotate: new FormControl(0),
    exposure: new FormControl(0),
    contrast: new FormControl(0),
    saturation: new FormControl(0),
    temperature: new FormControl(0),
    tint: new FormControl(0),
    highlights: new FormControl(0),
    opacity: new FormControl(100),
  });

  public sliders = F_IMAGE_PICKER_CONFIGURATION_SLIDERS;

  public imageModes = F_IMAGE_PICKER_IMAGE_MODES;

  public ngAfterViewInit(): void {
    this.redraw();
    this.subscriptions$.add(this.subscribeToFormChanges());
  }

  private redraw(): void {
    this.formGroup.setValue(this.value || defaultFImage());
  }

  private subscribeToFormChanges(): Subscription {
    return this.formGroup.valueChanges.pipe(startWith(this.formGroup.value)).subscribe((value: any) => {
      const image: IFImage = { ...this.value, ...value };
      this.fPreviewComponent.draw(image);
      this.value = image;
      this.valueChange.emit(image);
    });
  }

  public rotateImage(): void {
    let value = this.formGroup.value.rotate + 90;
    if (value >= 360) {
      value = 0;
    }
    this.formGroup.patchValue({ rotate: value });
  }

  public ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}



const F_IMAGE_PICKER_CONFIGURATION_SLIDERS: any[] = [
  { key: 'opacity', min: 0, max: 100, class: 'f-slider' },
  { key: 'exposure', min: -100, max: 100, class: 'f-middle-slider' },
  { key: 'contrast', min: 0, max: 200, class: 'f-middle-slider' },
  { key: 'saturation', min: 0, max: 200, class: 'f-middle-slider' },
  { key: 'temperature', min: 0, max: 100, class: 'f-slider' },
  { key: 'tint', min: -360, max: 360, class: 'f-middle-slider' },
  { key: 'highlights', min: -100, max: 100, class: 'f-middle-slider' },
];

const F_IMAGE_PICKER_IMAGE_MODES: IIdName[] = [
  { id: EFImageMode.FILL, name: 'Fill' },
  { id: EFImageMode.FIT, name: 'Fit' },
  { id: EFImageMode.CROP, name: 'Crop' },
  { id: EFImageMode.TILE, name: 'Tile' },
];
