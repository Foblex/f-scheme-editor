import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { IClipboardData } from './i-clipboard-data';
import { CopyToClipboardHandler } from './copy-to-clipboard.handler';
import { PasteFromClipboardHandler } from './paste-from-clipboard.handler';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  public isReadGranted(): Observable<boolean> {
    // @ts-ignore
    return from(navigator.permissions.query({ name: 'clipboard-read' })).pipe(
        map((permission: PermissionStatus) => {
          return permission.state !== 'denied';
        })
    );
  }

  public isWriteGranted(): Observable<boolean> {
    // @ts-ignore
    return from(navigator.permissions.query({ name: 'clipboard-write' })).pipe(
        map((permission: PermissionStatus) => {
          return permission.state !== 'denied';
        })
    );
  }

  public copy(data: IClipboardData<any, any>): Observable<any | undefined> {
    return new CopyToClipboardHandler().handle(data);
  }

  public paste<T>(type: string): Observable<T | undefined> {
    return new PasteFromClipboardHandler().handle(type);
  }
}
