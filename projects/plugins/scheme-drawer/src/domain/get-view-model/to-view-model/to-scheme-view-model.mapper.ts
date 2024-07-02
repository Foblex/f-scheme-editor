import { IHandler } from '@foblex/core';
import { ToSchemeViewModelRequest } from './to-scheme-view-model.request';
import { ISchemeViewModel } from '../../i-scheme-view-model';
import { ISchemeNodeViewModel } from '../../i-scheme-node-view-model';
import { ISchemeConnection } from '../../i-scheme-connection';
import { ISchemeConnectionViewModel } from '../../i-scheme-connection-view-model';
import { IScheme } from '../../i-scheme';
import { INodeConnectorViewModel } from '../../i-node-connector-view-model';
import { IConnectionStyle, IRectStyle, ITextStyle } from '../../../components/configuration';

export class ToSchemeViewModelMapper implements IHandler<ToSchemeViewModelRequest, ISchemeViewModel> {

  public handle(payload: ToSchemeViewModelRequest): ISchemeViewModel {

    const entity = payload.entity;

    const connections = this.mapConnections(entity.connections);

    const nodes = this.mapNodes(entity);

    return {
      key: entity.key,
      visualState: {
        position: payload.visualState?.position,
        scale: payload.visualState?.scale,
      },
      background: entity.background,
      fill: entity.fill,
      stroke: entity.stroke,
      nodes: nodes,
      connections: connections,
    };
  }

  private mapNodes(entity: IScheme): ISchemeNodeViewModel[] {
    return entity.nodes.map(node => {
      return {
        ...node,
        textStyle: this.mapTextModel(node.textStyle),
        rectStyle: this.mapRectModel(node.rectStyle),
        inputs: this.mapInputs(entity.connections, node.key),
        outputs: this.mapOutputs(entity.connections, node.key),
      }
    });
  }

  private mapConnections(connections: ISchemeConnection[]): ISchemeConnectionViewModel[] {
    return connections.map(connection => ({
      ...connection,
      style: this.mapConnectionStyle(connection.style),
      text: this.mapTextModel(connection.text),
    }));
  }

  private mapConnectionStyle(style: IConnectionStyle): IConnectionStyle {
    return {
      ...style,
      color: { ...style.color },
    }
  }

  private mapTextModel(text: ITextStyle): ITextStyle {
    return {
      ...text,
      rect: this.mapRectModel(text.rect),
    }
  }

  private mapRectModel(rect: IRectStyle): IRectStyle {
    return {
      ...rect,
      border: { ...rect.border },
      borderRadius: { ...rect.borderRadius },
      padding: { ...rect.padding },
    }
  }

  private mapOutputs(connections: ISchemeConnection[], nodeKey: string): INodeConnectorViewModel[] {
    return connections.filter(x => x.from === nodeKey).map(x => {
      return {
        key: x.key,
        connectionSide: x.connectionSideStart,
      }
    });
  }

  private mapInputs(connections: ISchemeConnection[], nodeKey: string): INodeConnectorViewModel[] {
    return connections.filter(x => x.to === nodeKey).map(x => {
      return {
        key: x.key,
        connectionSide: x.connectionSideEnd,
      }
    });
  }
}
