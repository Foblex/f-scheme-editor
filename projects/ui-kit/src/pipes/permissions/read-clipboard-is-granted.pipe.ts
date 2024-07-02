import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'readClipboardIsGranted',
  standalone: true
})
export class ReadClipboardIsGrantedPipe implements PipeTransform {

  public transform(): Observable<boolean> {
    // @ts-ignore
    return navigator.permissions.query({ name: 'clipboard-read' }).pipe(
        map((permission: PermissionStatus) => {
          return permission.state !== 'denied';
        })
    );
  }
}
