import { EFConnectableSide, EFConnectionBehavior, EFConnectionType } from '@foblex/flow';
import { ESchemeConnectionMarker } from './e-scheme-connection-marker';
import { IConnectionStyle, ITextStyle } from '../components/configuration';

export interface ISchemeConnection {

  key: string;

  behaviour: EFConnectionBehavior;

  type: EFConnectionType;

  connectionSideStart: EFConnectableSide;

  connectionSideEnd: EFConnectableSide;

  markerStart: ESchemeConnectionMarker;

  markerEnd: ESchemeConnectionMarker;

  from: string;

  to: string;

  radius: number;

  offset: number;

  style: IConnectionStyle;

  text: ITextStyle;
}
