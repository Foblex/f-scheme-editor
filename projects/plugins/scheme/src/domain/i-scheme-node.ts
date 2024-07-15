import { IRectStyle, ITextStyle } from '../components/configuration';
import { IFImage } from '@ui-kit';

export interface ISchemeNode {

  key: string;

  type: string;

  image: IFImage;

  textStyle: ITextStyle;

  rectStyle: IRectStyle;
}
