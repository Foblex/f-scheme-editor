import { IHandler } from '@foblex/core';
import { from, map, Observable, of, switchMap } from 'rxjs';

export class PasteFromClipboardHandler implements IHandler<string, Observable<any | undefined>> {

  public handle(payload: string): Observable<any | undefined> {
    // @ts-ignore
    return from(navigator.permissions.query({ name: 'clipboard-read' })).pipe(
        map((permission: PermissionStatus) => {
          return permission.state !== 'denied';
        }),
        switchMap((isGranted: boolean) => {
          if (isGranted) {
            return from(navigator.clipboard.read()).pipe(switchMap((content: ClipboardItems) => {
              if (content.length && content[0].types.includes('text/plain')) {
                return from(content[ 0 ].getType('text/plain')).pipe(switchMap((blob: Blob) => {
                  if (blob && blob instanceof Blob) {
                    return from(blob.text()).pipe(map((x) => {
                      if (x.includes(payload)) {
                        return JSON.parse(x).data;
                      } else {
                        return undefined;
                      }
                    }));
                  }
                  return of(undefined);
                }));
              }
              return of(undefined);
            }));
          }
          return of(undefined);
        })
    );
  }
}
