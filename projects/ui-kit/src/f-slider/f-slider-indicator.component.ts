import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import {
  AfterViewInit, ChangeDetectionStrategy, Component,
  ElementRef, OnDestroy,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'f-slider-indicator',
  templateUrl: './f-slider-indicator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FSliderIndicatorComponent implements AfterViewInit, OnDestroy {

  private subscription$: Subscription = new Subscription();

  private get thumb(): MatSliderThumb {
    return this.slider._input as MatSliderThumb;
  }

  private get min(): number {
    return this.slider.min;
  }

  private get max(): number {
    return this.slider.max;
  }

  private get activeIndicator(): HTMLElement {
    return this.elementRef.nativeElement.lastChild as HTMLElement;
  }

  constructor(
    private slider: MatSlider,
    private elementRef: ElementRef<HTMLElement>,
  ) {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscription$.add(this.subscribeOnInputChange());
    });
  }

  private subscribeOnInputChange(): Subscription {
    return this.getEvent().subscribe((event: any) => {
      const value = event.target.value;
      const fullRange = this.max - this.min;
      const middleValue = this.min + fullRange / 2;

      const percentage = (Math.abs(value - middleValue) / fullRange) * 100;

      if (value < middleValue) {
        this.activeIndicator.style.right = '50%';
        this.activeIndicator.style.left = 'unset';
      } else if (value > middleValue) {
        this.activeIndicator.style.left = '50%';
        this.activeIndicator.style.right = 'unset';
      }
      this.activeIndicator.style.width = `${ percentage }%`;
    });
  }

  private getEvent(): Observable<any> {
    return fromEvent(this.slider._elementRef.nativeElement, 'input').pipe(startWith(this.getInitialEventData()));
  }

  private getInitialEventData(): any {
    return {
      target: {
        value: this.thumb.value,
      }
    }
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
