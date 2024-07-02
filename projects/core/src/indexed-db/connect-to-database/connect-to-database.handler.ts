import { IHandler } from '@foblex/core';
import { DB_NAME, DB_STORE_NAME, DB_VERSION } from '../constants';
import { ConnectToDatabaseRequest } from './connect-to-database.request';

export class ConnectToDatabaseHandler implements IHandler<ConnectToDatabaseRequest, Promise<IDBDatabase>> {

  public handle(payload: ConnectToDatabaseRequest): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("IndexedDB not supported"));
        return;
      }
      const openRequest = indexedDB.open(DB_NAME, DB_VERSION);

      openRequest.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
          db.createObjectStore(DB_STORE_NAME, { keyPath: 'id' });
        }
      };

      openRequest.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      openRequest.onerror = (error) => {
        console.error('Error opening db', error);
        reject(error);
      };
    });
  }
}
