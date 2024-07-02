import { InjectionToken } from '@angular/core';

export const F_OVERLAY_PANEL_COMPONENT: InjectionToken<IFOverlayPanelComponent<any>> = new InjectionToken<IFOverlayPanelComponent<any>>('F_OVERLAY_PANEL_COMPONENT');

export interface IFOverlayPanelComponent<T> {

  setValue(value: T): void;
}
