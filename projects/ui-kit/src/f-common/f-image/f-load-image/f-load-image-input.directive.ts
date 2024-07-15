import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { defaultFImage } from '@ui-kit';

@Directive({
  selector: 'input[fLoadImageInput]',
  standalone: true,
})
export class FLoadImageInputDirective implements OnInit {

  @Input({ alias: 'fLoadImageInput', required: true })
  public formGroup!: FormGroup;

  private get inputElement(): HTMLInputElement {
    return this.elementReference.nativeElement;
  }

  constructor(
    private elementReference: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
  ) {
  }

  public ngOnInit(): void {
    this.renderer.setAttribute(this.inputElement, 'accept', 'image/*');
    this.renderer.setAttribute(this.inputElement, 'type', 'file');
    this.renderer.setStyle(this.inputElement, 'display', 'none');
  }

  public click(): void {
    this.inputElement.click();
  }

  @HostListener('change', [ '$event' ])
  public onChange(event: Event): void {
    this.fLoadImage(event, this.formGroup);
  }

  private fLoadImage(event: Event, form: FormGroup): void {
    try {
      if (!this.isValid(event)) {
        throw new Error('Invalid file input');
      }

      const file = this.getInput(event).files![ 0 ];

      if (!this.isImage(file)) {
        throw new Error('File is not an image');
      }

      if (!this.isUnderMaxSize(file)) {
        throw new Error('File size exceeds 1MB');
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        form.setValue(defaultFImage(reader.result as string));
        this.getInput(event).value = '';
      };

      reader.onerror = (e) => {
        throw new Error('Error reading file');
      };

      reader.readAsDataURL(file);
    } catch (error) {
      // @ts-ignore
      console.error(error.message);
    }
  }

  private getInput(event: Event): HTMLInputElement {
    return event.target as HTMLInputElement;
  }

  private isValid(event: Event): boolean {
    const input = this.getInput(event);
    return !!input.files && !!input.files[ 0 ];
  }

  private isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  private isUnderMaxSize(file: File): boolean {
    const maxSizeInBytes = 1 * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }
}
