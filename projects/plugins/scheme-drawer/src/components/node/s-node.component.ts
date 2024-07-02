import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ISchemeNodeViewModel } from '../../domain';
import { EFResizeHandleType, FFlowModule } from '@foblex/flow';
import { SNodeStyleDirective } from './s-node-style.directive';

@Component({
  selector: 's-node',
  templateUrl: './s-node.component.html',
  styleUrls: [ './s-node.component.scss' ],
  standalone: true,
  imports: [
    NgOptimizedImage,
    FFlowModule,
    SNodeStyleDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SNodeComponent {

  @Input({ required: true })
  public viewModel!: ISchemeNodeViewModel;

  public eResizeHandleType = EFResizeHandleType;
}