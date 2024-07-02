import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStateService {

  private storage: Storage = window.sessionStorage;

  public setState<T>(key: string, value: T): void {
    let state: any = {
      ...value
    };
    const oldValue = this.getState(key) as T;
    if (oldValue) {
      state = {
        ...oldValue,
        ...value
      }
    }
    this.storage.setItem(key, JSON.stringify(state));
  }

  public getState<T>(key: string): T | undefined {
    let result: T | undefined;
    try {
      const value = this.storage.getItem(key);
      if (value) {
        result = JSON.parse(value);
      }
    } catch (e) {
      console.error(e);
    }
    return result;
  }

  public clearState(key: string): void {
    this.storage.removeItem(key);
  }
}
