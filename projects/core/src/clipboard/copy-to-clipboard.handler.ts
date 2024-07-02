import { IHandler } from '@foblex/core';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { IClipboardData } from './i-clipboard-data';

export class CopyToClipboardHandler implements IHandler<IClipboardData<any, any>, Observable<any | undefined>> {

  public handle(payload: IClipboardData<any, any>): Observable<any | undefined> {
    const toPaste = JSON.stringify(payload);

    const blob = new Blob([ toPaste ], { type: 'text/plain' });
    const data = [ new ClipboardItem({ [ blob.type ]: blob }) ];

    // @ts-ignore
    return from(window.navigator.permissions.query({ name: 'clipboard-write' })).pipe(
        map((permission: PermissionStatus) => {
          return permission.state !== 'denied';
        }),
        switchMap((isGranted: boolean) => {
          if (isGranted) {
            return from(navigator.clipboard.write(data));
          }
          return of(undefined);
        })
    );
  }
}
