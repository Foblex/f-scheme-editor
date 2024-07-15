import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ViewChild
} from '@angular/core';
import {
  FAlphaColorSmallRectComponent,
  FImageComponent,
  IFImage
} from '../../f-common';

@Component({
  selector: 'f-image-picker-prefix',
  templateUrl: './f-image-picker-prefix.component.html',
  styleUrls: [ './f-image-picker-prefix.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FImageComponent,
    FAlphaColorSmallRectComponent
  ]
})
export class FImagePickerPrefixComponent implements AfterViewInit {

  @ViewChild(FImageComponent, { static: true })
  public fImage!: FImageComponent;

  @ViewChild(FAlphaColorSmallRectComponent, { static: true })
  public fAlphaColorRect!: FAlphaColorSmallRectComponent;

  public ngAfterViewInit(): void {
    this.fAlphaColorRect.draw();
  }

  public draw(image: IFImage): void {
    this.fImage.draw(image);
  }
}
