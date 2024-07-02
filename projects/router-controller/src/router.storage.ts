import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEntitySummary } from '@core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterStorage {

  public get onRouterChanged$(): Observable<void> {
    return this.change$.asObservable();
  }

  private change$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activated: ActivatedRoute
  ) {
  }

  public show(entity: IEntitySummary): void {
    this.router.navigateByUrl(`${ entity.type }/${ entity.key }`).finally(() => {
      this.change$.next();
    })
  }

  public hideEditor(key: string): void {
    if (this.getEntityKey() === key) {
      this.router.navigateByUrl('').finally(() => {
        this.change$.next();
      });
    }
  }

  private getParams(): string[] {
    return this.activated.snapshot.children[ 0 ]?.url.map((x) => x.path) || [];
  }

  public getEntityKey(): string {
    const params = this.getParams();
    return params.length ? params[ 1 ] : '';
  }
}
