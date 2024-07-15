import { IMixedPanelConfiguration } from './i-mixed-panel-configuration';

export function getBorderRadiusPanelConfiguration(): IMixedPanelConfiguration {
  return {
    label: 'Border radius',
    icon: 'radius',
    icon1: 'radius-top-left',
    icon2: 'radius-top-right',
    icon3: 'radius-bottom-left',
    icon4: 'radius-bottom-right',
  };
}
