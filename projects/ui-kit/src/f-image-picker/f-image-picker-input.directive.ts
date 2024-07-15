import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Directive({
  selector: 'input[fImagePickerInput]',
  standalone: true
})
export class FImagePickerInputDirective implements OnInit, OnDestroy {

  private subscription$: Subscription = new Subscription();

  constructor(
    private elementReference: ElementRef<HTMLInputElement>,
    private control: NgControl
  ) {
  }

  public ngOnInit(): void {
    this.subscription$.add(this.subscribeOnValueChanges());
  }

  private subscribeOnValueChanges(): Subscription {
    return this.control.valueChanges!.pipe(startWith(null))!.subscribe(() => {
      this.updateValue();
    });
  }

  private updateValue(): void {
    if (this.control.value) {
      this.elementReference.nativeElement.value = 'Image';
    } else {
      this.elementReference.nativeElement.value = 'Choose image';
    }
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
