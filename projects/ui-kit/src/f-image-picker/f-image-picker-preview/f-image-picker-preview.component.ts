import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ViewChild
} from '@angular/core';
import { FAlphaColorRectComponent, FImageComponent, IFImage } from '../../f-common';

@Component({
  selector: 'f-image-picker-preview',
  templateUrl: './f-image-picker-preview.component.html',
  styleUrls: [ './f-image-picker-preview.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FAlphaColorRectComponent,
    FImageComponent
  ]
})
export class FImagePickerPreviewComponent implements AfterViewInit {

  @ViewChild(FImageComponent, { static: true })
  public fImage!: FImageComponent;

  @ViewChild(FAlphaColorRectComponent, { static: true })
  public fAlphaColorRect!: FAlphaColorRectComponent;

  public ngAfterViewInit(): void {
    this.fAlphaColorRect.draw();
  }

  public draw(image: IFImage): void {
    this.fImage.draw(image);
  }
}
