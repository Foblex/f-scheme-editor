import { InjectionToken } from '@angular/core';

export const F_OVERLAY_PANEL: InjectionToken<IFOverlayPanel<any>> = new InjectionToken<IFOverlayPanel<any>>('F_OVERLAY_PANEL');

export interface IFOverlayPanel<T> {

  value: T;

  close(): void;

  setValue(value: T): void;
}
