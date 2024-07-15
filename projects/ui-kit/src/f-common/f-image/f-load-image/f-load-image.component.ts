import {
  ChangeDetectionStrategy,
  Component, HostListener, Input, ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FLoadImageInputDirective } from './f-load-image-input.directive';

@Component({
  selector: 'f-load-image',
  templateUrl: './f-load-image.component.html',
  standalone: true,
  imports: [
    FLoadImageInputDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLoadImageComponent {

  @Input({ required: true })
  public formGroup!: FormGroup;

  @ViewChild(FLoadImageInputDirective)
  public fInput!: FLoadImageInputDirective;

  @HostListener('click', [ '$event' ])
  public onClick(event: Event): void {
    this.fInput.click();
  }
}
