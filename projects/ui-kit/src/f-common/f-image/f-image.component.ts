import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import { defaultFImage, EFImageMode, IFImage } from './domain';
import { FButtonComponent } from '../../f-button';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'f-image',
  templateUrl: './f-image.component.html',
  styleUrls: [ './f-image.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FButtonComponent,
    NgStyle
  ]
})
export class FImageComponent implements AfterViewInit {

  @Input()
  public image: IFImage = defaultFImage();

  public styles: { [ key: string ]: string } = {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngAfterViewInit(): void {
    this.draw(this.image);
    this.changeDetectorRef.detectChanges();
  }

  public draw(image: IFImage): void {
    this.image = image;
    this.styles = {
      'object-fit': this.getObjectFit(image.mode),
      'transform': `rotate(${ image.rotate ?? 0 }deg)`,
      'filter': this.getFilterStyles(image),
      'opacity': `${ image.opacity / 100 }`,
    };
    this.changeDetectorRef.markForCheck();
  }

  private getObjectFit(mode: EFImageMode): string {
    let result = 'initial';
    switch (mode) {
      case EFImageMode.FILL:
        result = 'fill';
        break;
      case EFImageMode.FIT:
        result = 'contain';
        break;
      case EFImageMode.CROP:
        result = 'cover';
        break;
      case EFImageMode.TILE:
        result = 'none';
        break;
      default:
        throw new Error(`Unknown image mode: ${ mode }`);
    }
    return result;
  }

  private getFilterStyles(image: IFImage): string {
    const exposure = image.exposure ? `brightness(${ 1 + image.exposure / 100 })` : '';
    const contrast = image.contrast ? `contrast(${ image.contrast }%)` : '';
    const saturation = image.saturation ? `saturate(${ image.saturation }%)` : '';
    const temperature = image.temperature ? `sepia(${ image.temperature }%)` : '';
    const tint = image.tint ? `hue-rotate(${ image.tint }deg)` : '';
    const highlights = image.highlights ? `brightness(${ 1 + image.highlights / 100 })` : '';

    return [ exposure, contrast, saturation, temperature, tint, highlights ].filter(Boolean).join(' ');
  }
}
