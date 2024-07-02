import { IRectStyle, ITextStyle } from '../components/configuration';

export interface ISchemeNode {

  key: string;

  type: string;

  textStyle: ITextStyle;

  rectStyle: IRectStyle;
}
