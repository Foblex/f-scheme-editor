import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetObjectPromiseHandler, GetObjectPromiseRequest } from './get-object-promise';
import { CreateObjectPromiseHandler, CreateObjectPromiseRequest } from './create-object-promise';
import { EditObjectPromiseHandler, EditObjectPromiseRequest } from './edit-object-promise';
import { ConnectToDatabaseHandler, ConnectToDatabaseRequest } from './connect-to-database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService<TData> {

  private readonly dbReady: Promise<IDBDatabase>;

  constructor() {
    this.dbReady = new ConnectToDatabaseHandler().handle(
        new ConnectToDatabaseRequest()
    );
  }

  public create(object: TData): Observable<void> {
    return new CreateObjectPromiseHandler().handle(
        new CreateObjectPromiseRequest(object, this.dbReady)
    );
  }

  public edit(object: TData): Observable<void> {
    return new EditObjectPromiseHandler().handle(
        new EditObjectPromiseRequest(object, this.dbReady)
    );
  }

  public get(id: string): Observable<TData | undefined> {
    return new GetObjectPromiseHandler<TData>().handle(
        new GetObjectPromiseRequest(id, this.dbReady)
    );
  }
}
