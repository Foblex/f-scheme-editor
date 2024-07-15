import { EFConnectableSide, EFConnectionBehavior, EFConnectionType } from '@foblex/flow';
import { EConnectionMarker, IConnectionStyle, ITextStyle } from '../components/configuration';

export interface ISchemeConnection {

  key: string;

  behaviour: EFConnectionBehavior;

  type: EFConnectionType;

  connectionSideStart: EFConnectableSide;

  connectionSideEnd: EFConnectableSide;

  markerStart: EConnectionMarker;

  markerEnd: EConnectionMarker;

  from: string;

  to: string;

  radius: number;

  offset: number;

  style: IConnectionStyle;

  text: ITextStyle;
}
