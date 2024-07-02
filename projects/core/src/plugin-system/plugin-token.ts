import { InjectionToken } from '@angular/core';
import { IEntityPlugin } from './i-entity-plugin';
import { IEntity } from '../core-domain';

export const PLUGIN_TOKEN = new InjectionToken<IEntityPlugin<IEntity>>('PLUGIN_TOKEN');
