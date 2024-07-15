import { GetSchemeViewModelHandler } from './get-view-model';
import { SchemeApiService } from './scheme.api-service';
import { AddNodeHandler } from './add-node';
import { AddConnectionHandler } from './add-connection';
import { TransformNodeHandler } from './transform-node';
import { ReassignConnectionHandler } from './reassign-connection';
import { TransformCanvasHandler } from './transform-canvas';
import {
  GetConfigurationHandler,
} from './get-configuration';
import {
  GetSchemeConnectionConfigurationHandler
} from './get-configuration';
import {
  GetSchemeConfigurationHandler
} from './get-configuration';
import {
  GetSchemeNodeConfigurationHandler
} from './get-configuration';

export const SCHEME_PROVIDERS = [

  AddConnectionHandler,

  AddNodeHandler,

  GetConfigurationHandler,

  GetSchemeConnectionConfigurationHandler,

  GetSchemeNodeConfigurationHandler,

  GetSchemeConfigurationHandler,

  GetSchemeViewModelHandler,

  TransformNodeHandler,

  ReassignConnectionHandler,

  TransformCanvasHandler,

  SchemeApiService
];
