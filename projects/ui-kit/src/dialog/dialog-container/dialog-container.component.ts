import {
  ChangeDetectionStrategy,
  Component, Input
} from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'dialog-container',
  templateUrl: 'dialog-container.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon
  ]
})
export class DialogContainerComponent {

  @Input()
  public title: string | undefined = '';

  constructor(
    private dialogReference: DialogRef
  ) {
  }

  public onCloseClick(): void {
    this.dialogReference?.close();
  }
}
