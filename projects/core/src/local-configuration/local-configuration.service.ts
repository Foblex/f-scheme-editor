import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ILocalConfiguration } from './model';
import { DEFAULT_LOCAL_CONFIGURATION } from './model';

@Injectable({
  providedIn: 'root'
})
export class LocalConfigurationService {

  private storage: Storage = window.localStorage;

  public get localStateChanges$(): Observable<void> {
    return this.onStateUpdated$.asObservable();
  }

  private onStateUpdated$: Subject<void> = new Subject<void>();

  public setState<T>(state: ILocalConfiguration, emitEvent: boolean = true): void {
    this.storage.setItem('configuration', JSON.stringify(state));
    if (emitEvent) {
      this.onStateUpdated$.next();
    }
  }

  public getState(): ILocalConfiguration {
    let result: ILocalConfiguration | undefined;
    try {
      const value = this.storage.getItem('configuration');
      if (value) {
        result = JSON.parse(value);
      }
    } catch (e) {
      console.error(e);
    }
    return result || DEFAULT_LOCAL_CONFIGURATION;
  }
}
