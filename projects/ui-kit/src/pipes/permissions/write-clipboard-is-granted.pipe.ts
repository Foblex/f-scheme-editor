import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'writeClipboardIsGranted',
  standalone: true
})
export class WriteClipboardIsGrantedPipe implements PipeTransform {

  public transform(): Observable<boolean> {
    // @ts-ignore
    return navigator.permissions.query({ name: 'clipboard-write' }).pipe(
        map((permission: PermissionStatus) => {
          return permission.state !== 'denied';
        })
    );
  }
}
