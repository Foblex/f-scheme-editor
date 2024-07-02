import { Injectable } from '@angular/core';
import { debounceTime, from, map, Observable, of, Subject, switchMap } from 'rxjs';
import { ISavedStoreData } from './i-saved-store-data';
import { IState } from './i-state';
import { createInitialState } from './create-initial-state';
import { IEntity } from '../core-domain';
import { DatabaseService } from '../indexed-db';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private data: IState | undefined;

  public get project(): IState {
    return this.data!;
  }

  private saveTrigger: Subject<IState> = new Subject<IState>();

  constructor(
    private database: DatabaseService<IState>
  ) {
  }

  public initialize(projectId: string): Observable<any> {
    return this.database.get(projectId).pipe(switchMap((snapshot) => {
      if (!snapshot) {
        const project = createInitialState(
          projectId, 'Root'
        );
        localStorage.setItem('prjKey', project.id);
        return from(this.database.create(project)).pipe(switchMap(() => {
          return this.database.get(project.id);
        }));
      } else {
        return of(snapshot);
      }
    }), map((x: IState | undefined) => {
      if (!x) {
        throw new Error(`${ this.constructor.name }. Store data not loaded.`);
      }
      this.data = x;
    }));
  }

  public save$(): Observable<{}> {
    return this.saveTrigger.pipe(debounceTime(350), switchMap((value) => {
        value.updatedAt = Date.now();
        return this.database.edit(value).pipe((switchMap(() => {
          return of({});
        })));
      })
    );
  }

  public saveData(): Observable<ISavedStoreData> {
    this.saveTrigger.next(this.project);
    return of({});
  }

  public getEntity<T extends IEntity>(key: string, type: string): T | undefined {
    const table = this.project.entities[ type ];
    const result = table ? table[ key ] : undefined;
    return result as T;
  }

  public getEntitiesByType(type: string): IEntity[] {
    return Object.values(this.project.entities[ type ] || {});
  }

  public getExistingEntityTypes(): string[] {
    return Object.keys(this.project.entities);
  }

  public removeEntity(key: string, type: string): void {
    if (!this.project.entities[ type ]) {
      return;
    }
    delete this.project.entities[ type ][ key ];
  }

  public setEntity(entity: IEntity): void {
    if (!this.project.entities[ entity.type ]) {
      this.project.entities[ entity.type ] = {};
    }

    this.project.entities[ entity.type ][ entity.key ] = entity;
  }
}



