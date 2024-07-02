import { IState } from './i-state';

export function createInitialState(id: string, name: string): IState {
  return {
    id,
    name,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    tree: {},
    entities: {},
  }
}
