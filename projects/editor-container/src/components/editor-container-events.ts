import { Subject } from 'rxjs';

export class EditorContainerEvents {

  public static reloadComponentEvent: Subject<void> = new Subject<void>();

  public static reloadDrawerEvent: Subject<void> = new Subject<void>();
}
