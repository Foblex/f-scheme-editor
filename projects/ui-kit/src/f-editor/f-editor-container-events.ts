import { Subject } from 'rxjs';

export class FEditorContainerEvents {

  public static reloadComponentEvent: Subject<void> = new Subject<void>();

  public static reloadDrawerEvent: Subject<void> = new Subject<void>();
}
