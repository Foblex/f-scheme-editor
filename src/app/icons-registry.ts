import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export function createIconsRegistry(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
  iconRegistry.addSvgIcon('background', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/background.svg'));

  borderRadius(iconRegistry, sanitizer);
  iconRegistry.addSvgIcon('close-panel', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/close-panel.svg'));

  padding(iconRegistry, sanitizer);

  iconRegistry.addSvgIcon('line-size', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/line-size.svg'));
  iconRegistry.addSvgIcon('connection-behaviour', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-behaviour.svg'));
  iconRegistry.addSvgIcon('connection-offset', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-offset.svg'));
  iconRegistry.addSvgIcon('connection-radius', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-radius.svg'));
  iconRegistry.addSvgIcon('connection-side', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-side.svg'));
  iconRegistry.addSvgIcon('connection-switch', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-switch.svg'));
  iconRegistry.addSvgIcon('connection-type', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-type.svg'));
  iconRegistry.addSvgIcon('font-size', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/font-size.svg'));

  iconRegistry.addSvgIcon('width', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/width.svg'));
  iconRegistry.addSvgIcon('height', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/height.svg'));

  iconRegistry.addSvgIcon('visible', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visible.svg'));
  iconRegistry.addSvgIcon('hidden', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/hidden.svg'));

  iconRegistry.addSvgIcon('rotate', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rotate.svg'));

  lineStyle(iconRegistry, sanitizer);
  connectionTypes(iconRegistry, sanitizer);
  connectionBehaviour(iconRegistry, sanitizer);
  connectionMarkers(iconRegistry, sanitizer);
}


function borderRadius(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
  iconRegistry.addSvgIcon('radius', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/border-radius/radius.svg'));
  iconRegistry.addSvgIcon('radius-top-left', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/border-radius/top-left.svg'));
  iconRegistry.addSvgIcon('radius-top-right', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/border-radius/top-right.svg'));
  iconRegistry.addSvgIcon('radius-bottom-right', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/border-radius/bottom-right.svg'));
  iconRegistry.addSvgIcon('radius-bottom-left', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/border-radius/bottom-left.svg'));
}

function padding(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
  iconRegistry.addSvgIcon('padding', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/padding/padding.svg'));
  iconRegistry.addSvgIcon('padding-top', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/padding/padding-top.svg'));
  iconRegistry.addSvgIcon('padding-right', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/padding/padding-right.svg'));
  iconRegistry.addSvgIcon('padding-bottom', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/padding/padding-bottom.svg'));
  iconRegistry.addSvgIcon('padding-left', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/padding/padding-left.svg'));
}

function lineStyle(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
  iconRegistry.addSvgIcon('line-style', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/line-style/line-style.svg'));
  iconRegistry.addSvgIcon('line-style-dotted', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/line-style/dotted.svg'));
  iconRegistry.addSvgIcon('line-style-dashed', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/line-style/dashed.svg'));
  iconRegistry.addSvgIcon('line-style-solid', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/line-style/solid.svg'));
}

function connectionTypes(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
  iconRegistry.addSvgIcon('connection-step', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-types/step-line.svg'));
  iconRegistry.addSvgIcon('connection-bezier', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-types/bezier-line.svg'));
  iconRegistry.addSvgIcon('connection-straight', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-types/straight-line.svg'));
}

function connectionBehaviour(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
  iconRegistry.addSvgIcon('behaviour-fixed', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-behaviour/behaviour-fixed.svg'));
  iconRegistry.addSvgIcon('behaviour-fixed-center', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-behaviour/behaviour-fixed-center.svg'));
  iconRegistry.addSvgIcon('behaviour-floating', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/connection-behaviour/behaviour-floating.svg'));
}

function connectionMarkers(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
  iconRegistry.addSvgIcon('line', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/markers/line.svg'));
  iconRegistry.addSvgIcon('arrow', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/markers/arrow.svg'));
  iconRegistry.addSvgIcon('back-arrow', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/markers/back-arrow.svg'));
  iconRegistry.addSvgIcon('thin-arrow', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/markers/thin-arrow.svg'));
  iconRegistry.addSvgIcon('circle', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/markers/circle.svg'));
  iconRegistry.addSvgIcon('rombed', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/markers/rombed.svg'));
}
